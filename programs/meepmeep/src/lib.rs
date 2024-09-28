use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

declare_id!("3CZyEWmVeZ962D1cxKdRHdZi1gU64T25xvxkd3xQdsDe");

#[error_code]
pub enum BossError {
    #[msg("Boss is already defeated")]
    BossAlreadyDefeated,
    #[msg("Insufficient funds")]
    InsufficientFunds,
    #[msg("Not the owner")]
    NotTheOwner,
}

#[program]
mod meepmeep {
    use super::*;

    pub fn create_boss(ctx: Context<CreateBoss>, boss_id: u64, health: u64) -> Result<()> {
        let boss = &mut ctx.accounts.boss;
        boss.boss_id = boss_id;
        boss.health = health;
        boss.is_defeated = false;
        boss.bump = ctx.bumps.boss;
        boss.owner = *ctx.accounts.user.key;
        Ok(())
    }

    pub fn deal_damage(ctx: Context<DealDamage>, damage: u64) -> Result<()> {
        let boss = &mut ctx.accounts.boss;

        if boss.is_defeated {
            return Err(BossError::BossAlreadyDefeated.into());
        }

        let transfer_amount = damage * 10_000;

        if ctx.accounts.user.lamports() < transfer_amount {
            return Err(BossError::InsufficientFunds.into());
        }

        let cpi_accounts = Transfer {
            from: ctx.accounts.user.to_account_info(),
            to: boss.to_account_info(),
        };
        let cpi_program = ctx.accounts.system_program.to_account_info();
        let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
        transfer(cpi_context, transfer_amount)?;

        if damage >= boss.health {
            boss.is_defeated = true;
            boss.health = 0;
        } else {
            boss.health -= damage;
        }

        let player_address = *ctx.accounts.user.key;

        if let Some(player) = boss
            .players
            .iter_mut()
            .find(|p| p.address == player_address)
        {
            player.damage += damage;
            player.count += 1;
        } else {
            boss.players.push(PlayerInfo {
                address: player_address,
                damage,
                count: 1,
            });
        }

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let boss = &mut ctx.accounts.boss;

        if boss.owner != *ctx.accounts.user.key {
            return Err(BossError::NotTheOwner.into());
        }

        let boss_account_info = ctx.accounts.boss.to_account_info();
        let recipient_account_info = ctx.accounts.recipient.to_account_info();

        **boss_account_info.try_borrow_mut_lamports()? -= amount;
        **recipient_account_info.try_borrow_mut_lamports()? += amount;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(boss_id: u64)]
pub struct CreateBoss<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8 + 8 + 1 + 1 + 8 + (std::mem::size_of::<PlayerInfo>() * 100), 
        seeds = [b"boss", user.key().as_ref(), boss_id.to_le_bytes().as_ref()],
        bump
    )]
    pub boss: Account<'info, Boss>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Boss {
    pub boss_id: u64,
    pub health: u64,
    pub is_defeated: bool,
    pub bump: u8,
    pub players: Vec<PlayerInfo>,
    pub owner: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct PlayerInfo {
    pub address: Pubkey,
    pub damage: u64,
    pub count: u64,
}

#[derive(Accounts)]
pub struct DealDamage<'info> {
    #[account(mut)]
    pub boss: Account<'info, Boss>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub boss: Account<'info, Boss>,
    pub user: Signer<'info>,
    /// CHECK: This is a checked account, we only need the public key
    pub recipient: UncheckedAccount<'info>,
}
