'use client'

import atlas from '@/assets/atlas.json'
import uiSpritesheet from '@/assets/ui.png'
import { CAMERA_CONFIG } from '@/configs/game'
import LobbyHud from '@/huds/lobby'
import { connectToColyseus, disconnectFromColyseus } from '@/libs/colyseus'
import Lobby from '@/scenes/lobby'
import { useSpritesheet } from '@/stores/spritesheet'
import { Canvas } from '@react-three/fiber'
import { useParams } from 'next/navigation'
import { Assets, Spritesheet, Texture } from 'pixi.js'
import { Perf } from 'r3f-perf'
import { useEffect } from 'react'

import '@pixi/events'

async function preload() {
  const assets = [
    {
      alias: 'ui-spritesheet',
      src: uiSpritesheet,
    },
  ]

  await Assets.load(assets)
}

export default function PageClient() {
  const roomId = useParams<{ id: string }>().id
  const setSpritesheet = useSpritesheet((state) => state.setSpritesheet)

  useEffect(() => {
    ;(async () => {
      await preload()
      const spritesheet = new Spritesheet(Texture.from('ui-spritesheet'), atlas)
      await spritesheet.parse()
      setSpritesheet(spritesheet)
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
        {/* <Physics debug={true}> */}
        <Perf position='top-left' />

        <Lobby />
        {/* </Physics> */}
      </Canvas>
    </main>
  )
}
