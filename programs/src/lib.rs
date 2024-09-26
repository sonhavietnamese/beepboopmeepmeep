use anchor_lang::prelude::*;

declare_id!("FrtvVvyP7CfPzSgxkXNPKZPsHsYVjAprhk5WEZJFVQHH");

#[program]
pub mod game {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
