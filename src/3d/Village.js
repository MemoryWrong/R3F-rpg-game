import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { useFrame, useGraph, useThree} from '@react-three/fiber'
import useStore from '../engine/store';
import { useFBX, useGLTF } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

function Tower(props) {
  const gltf = useLoader(GLTFLoader, '/village/tower/scene.gltf')
  return (
    <group 
      scale={[0.01, 0.01, 0.01]} 
      position={[15, 0, 15]}
    >
      <primitive object={gltf.scene} />
    </group>
  )
}

function House(props) {
  const gltf = useLoader(GLTFLoader, '/village/house/scene.gltf')
  return (
    <group 
      scale={[0.01, 0.01, 0.01]} 
      position={props.position ? props.position : [0, 5, 0]}
    >
      <primitive object={gltf.scene} />
    </group>
  )
}

function Tree(props) {
  const gltf = useLoader(GLTFLoader, '/village/tree/scene.gltf')
  return (
    <group 
      scale={[1, 1, 1]} 
      position={props.position ? props.position : [0, 0, 0]}
    >
      <primitive object={gltf.scene} />
    </group>
  )
}

function Village(props) {
  const {
    enemys,
    enemy,
    actions,
    mutation,
  } = useStore(state => state);
  
  return (
    <group>
      {
        enemys && enemys.map((e, i) => (
          <Tree key={i} {...e} position={e.position} />
        ))
      }
      {/* <House /> */}
      <Tower />
      <Tree />
    </group>
  )
}

export default Village;
