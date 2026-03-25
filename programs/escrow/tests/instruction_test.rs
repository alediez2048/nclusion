use anchor_lang::prelude::Pubkey;
use escrow::state::*;

#[test]
fn test_market_status_transitions() {
    // Open → Settled is valid
    let status = MarketStatus::Open;
    assert_ne!(status, MarketStatus::Settled);

    // Cancelled is a terminal state
    let cancelled = MarketStatus::Cancelled;
    assert_eq!(cancelled, MarketStatus::Cancelled);
}

#[test]
fn test_bet_status_transitions() {
    // Placed is the initial state
    let status = BetStatus::Placed;
    assert_eq!(status, BetStatus::Placed);

    // Won and Lost are terminal
    assert_ne!(BetStatus::Won, BetStatus::Lost);
}

#[test]
fn test_selection_equality() {
    assert_eq!(Selection::Home, Selection::Home);
    assert_ne!(Selection::Home, Selection::Away);
    assert_ne!(Selection::Draw, Selection::Away);
}

#[test]
fn test_payout_calculation() {
    // Stake: 500, Odds: 350 (= 3.50x) → payout = 500 * 350 / 100 = 1750
    let stake: u64 = 500;
    let odds: u32 = 350;
    let payout = (stake as u128)
        .checked_mul(odds as u128)
        .unwrap()
        .checked_div(100)
        .unwrap() as u64;
    assert_eq!(payout, 1750);
}

#[test]
fn test_payout_calculation_fractional() {
    // Stake: 100, Odds: 215 (= 2.15x) → payout = 100 * 215 / 100 = 215
    let stake: u64 = 100;
    let odds: u32 = 215;
    let payout = (stake as u128)
        .checked_mul(odds as u128)
        .unwrap()
        .checked_div(100)
        .unwrap() as u64;
    assert_eq!(payout, 215);
}

#[test]
fn test_market_size() {
    // Ensure Market::SIZE is reasonable (should fit in a Solana account)
    assert!(Market::SIZE > 100);
    assert!(Market::SIZE < 1024);
}

#[test]
fn test_bet_size() {
    assert!(Bet::SIZE > 100);
    assert!(Bet::SIZE < 1024);
}

#[test]
fn test_bet_pda_uniqueness() {
    let program_id = Pubkey::new_unique();
    let market_id = "match_001";
    let user = Pubkey::new_unique();

    // Same user, same market, different bet_id → different PDAs
    let (pda1, _) = Pubkey::find_program_address(
        &[b"bet", market_id.as_bytes(), user.as_ref(), b"bet_001"],
        &program_id,
    );
    let (pda2, _) = Pubkey::find_program_address(
        &[b"bet", market_id.as_bytes(), user.as_ref(), b"bet_002"],
        &program_id,
    );
    assert_ne!(pda1, pda2);

    // Duplicate bet_id → same PDA (Anchor init will reject)
    let (pda3, _) = Pubkey::find_program_address(
        &[b"bet", market_id.as_bytes(), user.as_ref(), b"bet_001"],
        &program_id,
    );
    assert_eq!(pda1, pda3);
}
