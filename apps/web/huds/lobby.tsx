import { useNetworkStore } from '@/libs/colyseus'
import { AlienRole, Messages } from '@repo/shared'

export default function LobbyHud() {
  const room = useNetworkStore((state) => state.room)
  const state = useNetworkStore((state) => state.state)

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
    <main className='absolute pointer-events-none inset-0 w-screen h-screen z-10 font-alien'>
      <section className='bottom-0 flex justify-center absolute w-full pointer-events-auto'>
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
      </section>
    </main>
  )
}
