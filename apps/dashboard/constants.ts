import { Keypair } from '@solana/web3.js'
import bs58 from 'bs58'

export const ADMIN_KEYPAIR = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY as string))
