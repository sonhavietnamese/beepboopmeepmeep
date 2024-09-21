import { PerspectiveCamera } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import { useBoundStore, useColyseusState } from '@/libs/colyseus-zustand'
import { AlienRole } from '@repo/shared'

const COLORS: Record<AlienRole, string> = {
  WARRIOR: 'red',
  ADC: 'blue',
  SUPPORT: 'green',
}

export default function Lobby() {
  // const aliens = useColyseusState((state) => state.aliens)
  const state = useBoundStore((state) => state.state)
  const aliens = state?.aliens
  return (
    <Suspense fallback={null}>
      <PerspectiveCamera makeDefault fov={35} position={[0, 3, 20]} castShadow />

      <mesh receiveShadow>
        <boxGeometry args={[20, 1, 20]} />
        <meshStandardMaterial color={'red'} />
      </mesh>

      <directionalLight position={[10, 10, 10]} intensity={1} castShadow />

      {aliens &&
        Array.from(aliens.keys()).map((sessionId, index) => (
          <mesh castShadow receiveShadow key={sessionId} position={[index * 2, 0, 0]}>
            <boxGeometry args={[1, 5, 1]} />
            <meshStandardMaterial color={COLORS[aliens.get(sessionId)?.role ?? AlienRole.WARRIOR]} />
          </mesh>
        ))}

      <ambientLight intensity={0.5} />
    </Suspense>
  )
}
