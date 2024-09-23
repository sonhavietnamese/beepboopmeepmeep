import { OrbitControls, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import { Suspense } from 'react'
import * as THREE from 'three'
import { acceleratedRaycast } from 'three-mesh-bvh'
import { GLTF } from 'three-stdlib'

THREE.Mesh.prototype.raycast = acceleratedRaycast

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh
  }
  materials: {}
}

export default function Planet() {
  const { nodes, materials } = useGLTF('/models/surface-transformed.glb') as GLTFResult

  const { scale } = useControls({
    scale: {
      value: 0.5,
      min: 0.001,
      max: 1,
      step: 0.001,
    },
  })

  return (
    <Suspense fallback={null}>
      <OrbitControls makeDefault />

      {/* <RigidBody colliders='trimesh' type='fixed'> */}
      <group rotation={[0, -Math.PI / 2, 0]} scale={scale} dispose={null}>
        <mesh geometry={nodes.Plane.geometry} receiveShadow castShadow>
          <meshStandardMaterial color='white' />
        </mesh>
      </group>
      {/* </RigidBody> */}
    </Suspense>
  )
}
