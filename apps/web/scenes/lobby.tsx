import Astronaut from '@/components/astronaut'
import Planet from '@/components/planet'
import { useNetworkStore } from '@/libs/colyseus'
import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { AlienRole } from '@repo/shared'
import { useControls } from 'leva'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

const COLORS: Record<AlienRole, string> = {
  WARRIOR: 'pink',
  ADC: 'blue',
  SUPPORT: 'green',
}

export default function Lobby() {
  const state = useNetworkStore((state) => state.state)
  const aliens = state?.aliens

  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  const { position } = useControls({
    position: {
      value: [0, 15, 45],
      min: 0,
      max: 100,
      step: 1,
    },
  })

  const player = useControls({
    player: {
      value: 6,
      min: 0,
      max: 10,
      step: 1,
    },
  })

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(new THREE.Vector3(0, 5, 0))
    }
  })

  return (
    <Suspense fallback={null}>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={35} position={position} castShadow />

      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 10]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />

      <Planet />
      <Astronaut />

      {aliens &&
        Array.from(aliens.keys()).map((sessionId, index) => (
          <mesh castShadow receiveShadow key={sessionId} position={[index * 2, player.player, 0]}>
            <boxGeometry args={[1, 5, 1]} />
            <meshStandardMaterial color={COLORS[aliens.get(sessionId)?.role as AlienRole] ?? COLORS[AlienRole.WARRIOR]} />
          </mesh>
        ))}
    </Suspense>
  )
}
