import { Connection } from '@solana/web3.js'

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL as string
export const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

export const fontCache = new Map<string, ArrayBuffer>()

export enum Font {
  ROBOTO_REGULAR = 'Roboto-Regular',
}

export const FONT_MAP: Record<Font, string> = {
  [Font.ROBOTO_REGULAR]: new URL('./assets/Roboto-Regular.ttf', import.meta.url).toString(),
}
