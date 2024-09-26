'use client'

import atlas from '@/assets/atlas-clean.json'
import uiSpritesheet from '@/assets/ui.png'
import { Butterfly } from '@/components/butterfly'
import { CAMERA_CONFIG } from '@/configs/game'
import { connectToColyseus, disconnectFromColyseus } from '@/libs/colyseus'
import { useSpritesheet } from '@/stores/spritesheet'
import '@pixi/events'
import { Canvas } from '@react-three/fiber'
import { useParams } from 'next/navigation'
import { Assets, Spritesheet, Texture } from 'pixi.js'
import { Perf } from 'r3f-perf'
import { useEffect } from 'react'

async function preload() {
  const assets = [
    {
      alias: 'ui-spritesheet',
      src: uiSpritesheet,
    },
    { alias: 'Seurat', src: '/fonts/FOT-Seurat Pro B.otf', data: { family: 'Seurat' } },
    { alias: 'Infinegarian', src: '/fonts/FOT-Seurat Pro B.otf', data: { family: 'Infinegarian' } },
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
      {/* <LobbyHud /> */}
      <Canvas
        shadows
        camera={{
          ...CAMERA_CONFIG,
          position: [0, 10, 20],
        }}>
        {/* <Physics debug={true}> */}
        <Perf position='bottom-left' />
        <ambientLight intensity={2} />
        <Butterfly />

        {/* <Lobby /> */}
        {/* </Physics> */}
      </Canvas>
    </main>
  )
}
