import AlienSelectionCard from '@/components/alien-selection-card'
import Cursor from '@/components/cursor'
import HudResizer from '@/components/hud-resizer'
import { useNetworkStore } from '@/libs/colyseus'
import { useSpritesheet } from '@/stores/spritesheet'
import { Container, Sprite, Stage, Text } from '@pixi/react'
import { AlienRole, Messages } from '@repo/shared'
import { TextStyle } from 'pixi.js'

export default function LobbyHud() {
  const room = useNetworkStore((state) => state.room)
  const state = useNetworkStore((state) => state.state)
  const spritesheet = useSpritesheet((state) => state.spritesheet)
  if (!room) return null
  if (!spritesheet) return null

  const isHost = state?.aliens.get(room?.sessionId)?.isHost

  const switchClass = (c: AlienRole) => {
    room?.send(Messages.SWITCH_ROLE, {
      role: c,
    })
  }

  const startGame = () => {
    room?.send(Messages.START_GAME)
  }
  return (
    <Stage width={window.innerWidth} height={window.innerHeight} className='absolute inset-0 z-10' options={{ resizeTo: window, backgroundAlpha: 0 }}>
      <HudResizer />

      <Cursor />
      <AlienSelectionCard />
    </Stage>
  )
}
