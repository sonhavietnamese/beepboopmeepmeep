import { useAnimations, useGLTF } from '@react-three/drei'
import { useGraph, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF, KTX2Loader, SkeletonUtils } from 'three-stdlib'

type ActionName = 'Move' | 'Idle' | 'Attack' | 'Damage' | 'Die'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Cute_butterfly: THREE.SkinnedMesh
    center: THREE.Bone
  }
  materials: {
    T_Cute_Butterfly_A: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

const ktx2Loader = new KTX2Loader()
ktx2Loader.setTranscoderPath('https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/basis/')

export function Butterfly(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null)

  const gl = useThree((state) => state.gl)

  const { scene, animations } = useGLTF('/models-transforms/cute-butterfly-a-transform.glb', undefined, undefined, (loader) => {
    ktx2Loader.detectSupport(gl)
    loader.setKTX2Loader(ktx2Loader)
  })

  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions?.Idle?.play()

    return () => {
      actions?.Idle?.stop()
    }
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Cute_Butterfly_A' scale={10}>
        <group name='root' position={[0, 0, 0]}>
          <primitive object={nodes.center} />
        </group>
        <skinnedMesh
          name='Cute_butterfly'
          geometry={nodes.Cute_butterfly.geometry}
          material={materials.T_Cute_Butterfly_A}
          skeleton={nodes.Cute_butterfly.skeleton}
          position={[0, 0, 0]}
        />
      </group>
    </group>
  )
}
