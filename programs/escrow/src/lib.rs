use anchor_lang::prelude::*;

declare_id!("Bwu8mqgHpVH9UcD89bAFF5RDmB96dEDHoY5PnX9x2kqB");

pub mod state;

use state::*;

#[program]
pub mod escrow {
    use super::*;

    /// Initialize a market escrow for a specific match.
    /// Creates the market account and escrow token account.
    pub fn initialize_market_escrow(
        ctx: Context<InitializeMarketEscrow>,
        market_id: String,
    ) -> Result<()> {
        let market = &mut ctx.accounts.market;
        market.market_id = market_id;
        market.authority = ctx.accounts.authority.key();
        market.escrow = ctx.accounts.escrow.key();
        market.status = MarketStatus::Open;
        market.total_escrowed = 0;
        market.bet_count = 0;
        market.result = None;
        msg!("Market escrow initialized: {}", market.market_id);
        Ok(())
    }
}

// --- Account Contexts ---

#[derive(Accounts)]
#[instruction(market_id: String)]
pub struct InitializeMarketEscrow<'info> {
    #[account(
        init,
        payer = authority,
        space = Market::SIZE,
        seeds = [b"market", market_id.as_bytes()],
        bump,
    )]
    pub market: Account<'info, Market>,

    /// The escrow token account (created externally as an ATA or passed in).
    /// CHECK: Validated by token program constraints in later instructions.
    pub escrow: UncheckedAccount<'info>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
