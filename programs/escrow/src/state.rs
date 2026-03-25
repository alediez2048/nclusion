use anchor_lang::prelude::*;

// --- Market Account ---
// PDA seeds: [b"market", market_id.as_bytes()]

#[account]
pub struct Market {
    /// Unique identifier for this market (matches provider match ID).
    pub market_id: String, // max 64 bytes
    /// Authority that can settle or cancel this market.
    pub authority: Pubkey,
    /// Escrow token account holding HTGN stakes.
    pub escrow: Pubkey,
    /// Current market status.
    pub status: MarketStatus,
    /// Total HTGN escrowed across all bets.
    pub total_escrowed: u64,
    /// Number of bets placed in this market.
    pub bet_count: u32,
    /// Settlement result (set after match ends).
    pub result: Option<Selection>,
    /// PDA bump seed.
    pub bump: u8,
}

impl Market {
    // 8 (discriminator) + 4+64 (string) + 32 (authority) + 32 (escrow)
    // + 1 (status) + 8 (total_escrowed) + 4 (bet_count) + 1+1 (option<selection>)
    // + 1 (bump) + padding
    pub const SIZE: usize = 8 + (4 + 64) + 32 + 32 + 1 + 8 + 4 + 2 + 1 + 64;
}

// --- Bet Account ---
// PDA seeds: [b"bet", market_id.as_bytes(), user_wallet.as_ref(), &nonce.to_le_bytes()]

#[account]
pub struct Bet {
    /// Deterministic bet ID (derived off-chain from user + market + nonce).
    pub bet_id: String, // max 64 bytes
    /// The user's wallet public key.
    pub user_wallet: Pubkey,
    /// The market this bet belongs to.
    pub market_id: String, // max 64 bytes
    /// User's selection: Home, Draw, or Away.
    pub selection: Selection,
    /// Stake amount in HTGN (smallest unit, 2 decimals).
    pub stake_amount: u64,
    /// Odds at time of acceptance (stored as basis points, e.g., 350 = 3.50).
    pub accepted_odds: u32,
    /// Current bet status.
    pub status: BetStatus,
    /// Slot when bet was placed.
    pub created_slot: u64,
    /// Settlement reference (tx signature, set after settlement).
    pub settlement_ref: Option<Pubkey>,
    /// Payout amount (set after settlement).
    pub payout_amount: Option<u64>,
    /// PDA bump seed.
    pub bump: u8,
}

impl Bet {
    // 8 (discriminator) + 4+64 (bet_id) + 32 (user_wallet) + 4+64 (market_id)
    // + 1 (selection) + 8 (stake) + 4 (odds) + 1 (status) + 8 (slot)
    // + 1+32 (option<pubkey>) + 1+8 (option<u64>) + 1 (bump) + padding
    pub const SIZE: usize = 8 + (4 + 64) + 32 + (4 + 64) + 1 + 8 + 4 + 1 + 8 + 33 + 9 + 1 + 64;
}

// --- Enums ---

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum MarketStatus {
    Open,
    Closed,
    Settled,
    Cancelled,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum Selection {
    Home,
    Draw,
    Away,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum BetStatus {
    Placed,
    AwaitingResult,
    Won,
    Lost,
    Cancelled,
}
