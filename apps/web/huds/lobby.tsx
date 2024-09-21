import { useColyseusRoom } from '@/libs/colyseus'
import { useBoundStore } from '@/libs/colyseus-zustand'
import { AlienRole, Messages } from '@repo/shared'

export default function LobbyHud() {
  // const room = useColyseusRoom()
  const room = useBoundStore((state) => state.room)

  const switchClass = (c: AlienRole) => {
    room?.send(Messages.SWITCH_CLASS, {
      role: c,
    })
  }

  return (
    <main className='absolute inset-0 w-screen h-screen z-10'>
      <section className='bottom-0 flex justify-center absolute w-full'>
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
        </ul>
      </section>
    </main>
  )
}
