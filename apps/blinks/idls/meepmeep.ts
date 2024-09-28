import { BN } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

export interface PlayerInfo {
  address: PublicKey
  damage: BN
  count: BN
}

export interface Boss {
  bossId: BN
  health: BN
  isDefeated: boolean
  bump: number
  players: PlayerInfo[]
  owner: PublicKey
}
