import { Connection } from '@solana/web3.js'

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL as string
export const connection = new Connection('https://devnet.helius-rpc.com/?api-key=eadd6885-8c9c-4ccc-9063-43f1e7d6012d' as string, 'confirmed')

export const fontCache = new Map<string, ArrayBuffer>()

export enum Font {
  ROBOTO_REGULAR = 'Roboto-Regular',
  BACKBEAT = 'CCBackBeatRegular',
}

export const FONT_MAP: Record<Font, string> = {
  [Font.ROBOTO_REGULAR]: new URL('./assets/Roboto-Regular.ttf', import.meta.url).toString(),
  [Font.BACKBEAT]: new URL('./assets/CCBackBeatRegular.ttf', import.meta.url).toString(),
}

export const CONFIG = {
  IMAGE_WIDTH: 800,
  IMAGE_HEIGHT: 800,
}
