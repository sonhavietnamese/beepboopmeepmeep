import * as THREE from 'three'
import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { useControls } from 'leva'

type ActionName = 'Loops'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Object_9: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    Astronaut: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export default function Astronaut(props: JSX.IntrinsicElements['group']) {
  const group = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/astronaut-transformed.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as GLTFResult
  const { actions } = useAnimations(animations, group)

  const controls = useControls('Astronaut', {
    position: {
      value: [0, -4, -24],
      min: -100,
      max: 100,
      step: 1,
    },
    scale: {
      value: 28,
      min: 0,
      max: 100,
      step: 1,
    },
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={controls.position} scale={controls.scale}>
        <primitive object={nodes._rootJoint} />
        <skinnedMesh
          name='Object_9'
          geometry={nodes.Object_9.geometry}
          material={materials.Astronaut}
          skeleton={nodes.Object_9.skeleton}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.085}
        />
      </group>
    </group>
  )
}
