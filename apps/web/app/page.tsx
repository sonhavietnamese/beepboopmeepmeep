'use client'

import Link from 'next/link'

export default function Home() {
  // const createRoom = useNetworkStore((s) => s.createRoom)
  // const router = useRouter()

  // const handleCreateRoom = async () => {
  //   const room = await createRoom()
  //   router.push(`/p/${room.id}`)
  // }

  return (
    <div className='text-red-500'>
      <Link href='/p/123'>Go to room</Link>
      {/* <button onClick={handleCreateRoom}>Create Room</button> */}
    </div>
  )
}
