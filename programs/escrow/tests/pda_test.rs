use anchor_lang::prelude::Pubkey;

#[test]
fn test_market_pda_derivation() {
    let program_id = Pubkey::new_unique();
    let market_id = "match_001";

    let (pda, bump) =
        Pubkey::find_program_address(&[b"market", market_id.as_bytes()], &program_id);

    // PDA should be deterministic — same inputs produce same output
    let (pda2, bump2) =
        Pubkey::find_program_address(&[b"market", market_id.as_bytes()], &program_id);

    assert_eq!(pda, pda2);
    assert_eq!(bump, bump2);

    // Different market_id should produce different PDA
    let (pda3, _) =
        Pubkey::find_program_address(&[b"market", b"match_002"], &program_id);

    assert_ne!(pda, pda3);
}

#[test]
fn test_bet_pda_derivation() {
    let program_id = Pubkey::new_unique();
    let market_id = "match_001";
    let user_wallet = Pubkey::new_unique();
    let nonce: u64 = 1;

    let (pda, bump) = Pubkey::find_program_address(
        &[
            b"bet",
            market_id.as_bytes(),
            user_wallet.as_ref(),
            &nonce.to_le_bytes(),
        ],
        &program_id,
    );

    // Deterministic
    let (pda2, bump2) = Pubkey::find_program_address(
        &[
            b"bet",
            market_id.as_bytes(),
            user_wallet.as_ref(),
            &nonce.to_le_bytes(),
        ],
        &program_id,
    );

    assert_eq!(pda, pda2);
    assert_eq!(bump, bump2);

    // Different nonce should produce different PDA (prevents duplicates)
    let nonce2: u64 = 2;
    let (pda3, _) = Pubkey::find_program_address(
        &[
            b"bet",
            market_id.as_bytes(),
            user_wallet.as_ref(),
            &nonce2.to_le_bytes(),
        ],
        &program_id,
    );

    assert_ne!(pda, pda3);

    // Different user should produce different PDA
    let user2 = Pubkey::new_unique();
    let (pda4, _) = Pubkey::find_program_address(
        &[
            b"bet",
            market_id.as_bytes(),
            user2.as_ref(),
            &nonce.to_le_bytes(),
        ],
        &program_id,
    );

    assert_ne!(pda, pda4);
}

#[test]
fn test_escrow_pda_derivation() {
    let program_id = Pubkey::new_unique();
    let market_id = "match_001";

    let (pda, _) =
        Pubkey::find_program_address(&[b"escrow", market_id.as_bytes()], &program_id);

    // Deterministic
    let (pda2, _) =
        Pubkey::find_program_address(&[b"escrow", market_id.as_bytes()], &program_id);

    assert_eq!(pda, pda2);
}
