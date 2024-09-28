import { IDL, Meepmeep } from '@/idls/meepmeep'
import { Program } from '@coral-xyz/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL as string
export const connection = new Connection('https://api.devnet.solana.com', 'finalized')

export const fontCache = new Map<string, ArrayBuffer>()

export enum Font {
  ROBOTO_REGULAR = 'Roboto-Regular',
  BACKBEAT = 'CCBackBeatRegular',
}

export enum Action {
  START = 'start',
  DEAL_DAMAGE = 'deal-damage',
}

export const FONT_MAP: Record<Font, string> = {
  [Font.ROBOTO_REGULAR]: new URL('./assets/Roboto-Regular.ttf', import.meta.url).toString(),
  [Font.BACKBEAT]: new URL('./assets/CCBackBeatRegular.ttf', import.meta.url).toString(),
}

export const CONFIG = {
  IMAGE_WIDTH: 800,
  IMAGE_HEIGHT: 800,
}

export const MEEPMEEP_PROGRAM_ID = new PublicKey(process.env.MEEPMEEP_PROGRAM_ID as string)
export const BOSS_PUBLIC_KEY = new PublicKey(process.env.BOSS_PUBLIC_KEY as string)

export const PROGRAM = new Program(IDL, MEEPMEEP_PROGRAM_ID, { connection: connection }) as Program<Meepmeep>
