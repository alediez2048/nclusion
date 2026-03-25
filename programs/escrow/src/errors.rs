use anchor_lang::prelude::*;

#[error_code]
pub enum EscrowError {
    #[msg("Market is not open for betting")]
    MarketNotOpen,

    #[msg("Market has already been settled")]
    MarketAlreadySettled,

    #[msg("Market has not been settled yet")]
    MarketNotSettled,

    #[msg("No result set for this market")]
    NoResult,

    #[msg("Bet has already been settled")]
    BetAlreadySettled,

    #[msg("Stake amount must be greater than zero")]
    InvalidStake,

    #[msg("Market ID exceeds maximum length (64 bytes)")]
    MarketIdTooLong,

    #[msg("Bet ID exceeds maximum length (64 bytes)")]
    BetIdTooLong,

    #[msg("Arithmetic overflow")]
    Overflow,
}
