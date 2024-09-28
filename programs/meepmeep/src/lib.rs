use anchor_lang::prelude::*;

declare_id!("AamArorzVAsGS3b8vTtzbQDj9vLgTu2cvTYofxuV5EEt");

#[error_code]
pub enum BossError {
    #[msg("Boss is already defeated")]
    BossAlreadyDefeated,
    #[msg("Insufficient funds")]
    InsufficientFunds,
}

#[program]
pub mod meepmeep {
    use super::*;

    use super::*;

    pub fn create_boss(ctx: Context<CreateBoss>, health: u64) -> Result<()> {
        let boss = &mut ctx.accounts.boss;
        boss.health = health;
        boss.total_damage = 0;
        boss.is_defeated = false;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateBoss<'info> {
    #[account(init, payer = user, space = 8 + 8 + 8 + 1)]
    pub boss: Account<'info, Boss>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct FightBoss<'info> {
    #[account(mut)]
    pub boss: Account<'info, Boss>,
    #[account(mut)]
    pub player: Account<'info, PlayerAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Boss {
    pub health: u64,
    pub total_damage: u64,
    pub is_defeated: bool,
}

#[account]
pub struct PlayerAccount {
    pub players: Vec<PlayerInfo>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct PlayerInfo {
    pub address: Pubkey,
    pub damage: u64,
}
