import * as Colyseus from 'colyseus.js'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export function ColyseusAdapter() {
  const roomId = useParams<{ id: string }>().id

  const client = new Colyseus.Client('ws://localhost:2567')

  const joinRoom = async () => {
    try {
      const room = await client.joinById(roomId)

      console.log(room)
      return room
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handle = async () => {
      try {
        const room = await joinRoom()

        console.log(room)
      } catch (error) {
        console.log(error)
      }
    }

    handle()
  }, [])

  return <> </>
}
