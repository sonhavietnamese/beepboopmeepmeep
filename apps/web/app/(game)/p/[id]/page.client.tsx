'use client'

import { CAMERA_CONFIG } from '@/configs/game'
import LobbyHud from '@/huds/lobby'
import { connectToColyseus, disconnectFromColyseus } from '@/libs/colyseus-zustand'
import Lobby from '@/scenes/lobby'
import { Canvas } from '@react-three/fiber'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function PageClient() {
  const roomId = useParams<{ id: string }>().id

  useEffect(() => {
    ;(async () => {
      await connectToColyseus('planet', { metadata: { id: roomId } })
    })()

    return () => {
      disconnectFromColyseus()
    }
  }, [roomId])

  return (
    <main className='relative w-screen overflow-hidden h-screen bg-black'>
      <LobbyHud />
      <Canvas
        shadows
        camera={{
          ...CAMERA_CONFIG,
          position: [0, 10, 20],
        }}>
        <Lobby />
      </Canvas>
    </main>
  )
}
