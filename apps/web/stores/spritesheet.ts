import { Spritesheet } from 'pixi.js'
import { create } from 'zustand'

interface SpritesheetState {
  spritesheet: Spritesheet | null
  setSpritesheet: (spritesheet: Spritesheet | null) => void
}

export const useSpritesheet = create<SpritesheetState>((set) => ({
  spritesheet: null,
  setSpritesheet: (spritesheet) => set({ spritesheet }),
}))
