export default function LobbyHud() {
  return (
    <main className='absolute inset-0 w-screen h-screen z-10'>
      <section className='bottom-0 flex justify-center absolute w-full'>
        <ul className='flex gap-2'>
          <li>
            <button className='w-[200px] h-[40px] bg-green-400'>TANK</button>
          </li>
          <li>
            <button className='w-[200px] h-[40px] bg-green-400'>AD</button>
          </li>
          <li>
            <button className='w-[200px] h-[40px] bg-green-400'>SUP</button>
          </li>
        </ul>
      </section>
    </main>
  )
}
