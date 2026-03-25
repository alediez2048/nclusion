use anchor_lang::prelude::*;

declare_id!("BNMBFrKe44v8F1rL3h8aPSFzWSVniEYx2DUUxizpbJSo");

pub mod errors;
pub mod state;

use errors::*;
use state::*;

#[program]
pub mod escrow {
    use super::*;

    /// Initialize a market escrow for a specific match.
    pub fn initialize_market_escrow(
        ctx: Context<InitializeMarketEscrow>,
        market_id: String,
    ) -> Result<()> {
        require!(market_id.len() <= 64, EscrowError::MarketIdTooLong);

        let market = &mut ctx.accounts.market;
        market.market_id = market_id;
        market.authority = ctx.accounts.authority.key();
        market.escrow = ctx.accounts.escrow.key();
        market.status = MarketStatus::Open;
        market.total_escrowed = 0;
        market.bet_count = 0;
        market.result = None;
        market.bump = ctx.bumps.market;
        msg!("Market escrow initialized: {}", market.market_id);
        Ok(())
    }

    /// SOL-005: Place a bet on a market.
    pub fn place_bet(
        ctx: Context<PlaceBet>,
        bet_id: String,
        selection: Selection,
        stake_amount: u64,
        accepted_odds: u32,
    ) -> Result<()> {
        let market = &mut ctx.accounts.market;
        require!(market.status == MarketStatus::Open, EscrowError::MarketNotOpen);
        require!(stake_amount > 0, EscrowError::InvalidStake);
        require!(bet_id.len() <= 64, EscrowError::BetIdTooLong);

        // SOL-006: Write canonical bet record
        let bet = &mut ctx.accounts.bet;
        bet.bet_id = bet_id;
        bet.user_wallet = ctx.accounts.user.key();
        bet.market_id = market.market_id.clone();
        bet.selection = selection;
        bet.stake_amount = stake_amount;
        bet.accepted_odds = accepted_odds;
        bet.status = BetStatus::Placed;
        bet.created_slot = Clock::get()?.slot;
        bet.settlement_ref = None;
        bet.payout_amount = None;
        bet.bump = ctx.bumps.bet;

        // Update market totals
        market.total_escrowed = market
            .total_escrowed
            .checked_add(stake_amount)
            .ok_or(EscrowError::Overflow)?;
        market.bet_count = market
            .bet_count
            .checked_add(1)
            .ok_or(EscrowError::Overflow)?;

        msg!(
            "Bet placed: {} on market {} for {} lamports",
            bet.bet_id,
            market.market_id,
            stake_amount
        );
        Ok(())
    }

    /// SOL-003/SET-003: Settle a market with a result.
    pub fn settle_market(
        ctx: Context<SettleMarket>,
        result: Selection,
    ) -> Result<()> {
        let market = &mut ctx.accounts.market;
        require!(
            market.status == MarketStatus::Open || market.status == MarketStatus::Closed,
            EscrowError::MarketAlreadySettled
        );

        market.result = Some(result);
        market.status = MarketStatus::Settled;

        msg!("Market {} settled with result: {:?}", market.market_id, result);
        Ok(())
    }

    /// Settle an individual bet after market settlement.
    pub fn settle_bet(ctx: Context<SettleBet>) -> Result<()> {
        let market = &ctx.accounts.market;
        require!(market.status == MarketStatus::Settled, EscrowError::MarketNotSettled);

        let result = market.result.ok_or(EscrowError::NoResult)?;
        let bet = &mut ctx.accounts.bet;

        // SOL-008: Enforce status constraints
        require!(bet.status == BetStatus::Placed, EscrowError::BetAlreadySettled);

        if bet.selection == result {
            // Winner: calculate payout (stake * odds / 100)
            let payout = (bet.stake_amount as u128)
                .checked_mul(bet.accepted_odds as u128)
                .ok_or(EscrowError::Overflow)?
                .checked_div(100)
                .ok_or(EscrowError::Overflow)? as u64;

            bet.status = BetStatus::Won;
            bet.payout_amount = Some(payout);
            msg!("Bet {} won: payout {}", bet.bet_id, payout);
        } else {
            bet.status = BetStatus::Lost;
            bet.payout_amount = Some(0);
            msg!("Bet {} lost", bet.bet_id);
        }

        Ok(())
    }

    /// Cancel a market — return all funds.
    pub fn cancel_market(ctx: Context<CancelMarket>) -> Result<()> {
        let market = &mut ctx.accounts.market;
        require!(
            market.status == MarketStatus::Open || market.status == MarketStatus::Closed,
            EscrowError::MarketAlreadySettled
        );

        market.status = MarketStatus::Cancelled;
        msg!("Market {} cancelled", market.market_id);
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

    /// CHECK: Escrow token account, validated in token transfer instructions.
    pub escrow: UncheckedAccount<'info>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(bet_id: String)]
pub struct PlaceBet<'info> {
    #[account(
        mut,
        seeds = [b"market", market.market_id.as_bytes()],
        bump = market.bump,
    )]
    pub market: Account<'info, Market>,

    #[account(
        init,
        payer = user,
        space = Bet::SIZE,
        seeds = [b"bet", market.market_id.as_bytes(), user.key().as_ref(), bet_id.as_bytes()],
        bump,
    )]
    pub bet: Account<'info, Bet>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SettleMarket<'info> {
    #[account(
        mut,
        seeds = [b"market", market.market_id.as_bytes()],
        bump = market.bump,
        has_one = authority,
    )]
    pub market: Account<'info, Market>,

    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct SettleBet<'info> {
    #[account(
        seeds = [b"market", market.market_id.as_bytes()],
        bump = market.bump,
    )]
    pub market: Account<'info, Market>,

    #[account(
        mut,
        seeds = [b"bet", bet.market_id.as_bytes(), bet.user_wallet.as_ref(), bet.bet_id.as_bytes()],
        bump = bet.bump,
    )]
    pub bet: Account<'info, Bet>,

    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct CancelMarket<'info> {
    #[account(
        mut,
        seeds = [b"market", market.market_id.as_bytes()],
        bump = market.bump,
        has_one = authority,
    )]
    pub market: Account<'info, Market>,

    pub authority: Signer<'info>,
}
