import { Connection } from '@solana/web3.js'

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL as string
export const connection = new Connection('https://api.devnet.solana.com', 'confirmed')
