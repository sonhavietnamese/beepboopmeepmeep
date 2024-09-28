import { PublicKey, SystemProgram } from '@solana/web3.js'
import { BOSS_PUBLIC_KEY, connection, PROGRAM } from '@/constants'
import BN from 'bn.js'

export const createDealDamageTx = async (sender: PublicKey, damage: number) => {
  const tx = await PROGRAM.methods
    .dealDamage(new BN(damage))
    .accounts({
      user: sender,
      boss: BOSS_PUBLIC_KEY,
      systemProgram: SystemProgram.programId,
    })
    .transaction()

  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  tx.feePayer = sender

  return tx
}
