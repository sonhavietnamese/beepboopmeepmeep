import { useNetworkStore } from '@/libs/colyseus'
import { useSpritesheet } from '@/stores/spritesheet'
import { Container, NineSlicePlane, Stage } from '@pixi/react'
import { AlienRole, Messages } from '@repo/shared'

export default function LobbyHud() {
  const room = useNetworkStore((state) => state.room)
  const state = useNetworkStore((state) => state.state)
  const spritesheet = useSpritesheet((state) => state.spritesheet)
  if (!room) return null

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
    <Stage width={window.innerWidth} height={window.innerHeight} className='absolute inset-0 z-10' options={{ backgroundAlpha: 0 }}>
      <Container position={[150, 150]}>
        {spritesheet && (
          <NineSlicePlane
            eventMode='static'
            anchor={[200, 100]}
            pivot={[200, 100]}
            leftWidth={73}
            topHeight={0}
            rightWidth={22}
            bottomHeight={0}
            width={400}
            height={300}
            x={250}
            onpointerdown={() => {
              console.log('clicked')
            }}
            y={120}
            texture={spritesheet.textures['ui-name-tag.png']}
          />
        )}
      </Container>
    </Stage>
  )
}
{
  /* <section className='bottom-0 flex justify-center absolute w-full pointer-events-auto'>
        <ul className='flex gap-2'>
          <li>
            <button className='w-[200px] h-[40px] bg-green-400' onClick={() => switchClass(AlienRole.WARRIOR)}>
              WARRIOR
            </button>
          </li>
          <li>
            <button className='w-[200px] h-[40px] bg-green-400' onClick={() => switchClass(AlienRole.ADC)}>
              ADC
            </button>
          </li>
          <li>
            <button className='w-[200px] h-[40px] bg-green-400' onClick={() => switchClass(AlienRole.SUPPORT)}>
              SUP
            </button>
          </li>

          {isHost && (
            <li>
              <button className='w-[200px] font-alien h-[40px] bg-green-400' onClick={startGame}>
                START GAME
              </button>
            </li>
          )}
        </ul>
      </section> */
}
