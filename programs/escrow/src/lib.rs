use anchor_lang::prelude::*;

declare_id!("Bwu8mqgHpVH9UcD89bAFF5RDmB96dEDHoY5PnX9x2kqB");

#[program]
pub mod escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
