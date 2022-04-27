import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { useFrame, useGraph, useThree} from '@react-three/fiber'
import useStore from '../engine/store';
import { useFBX, useGLTF } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

function GameMap(props) {
  const gltf = useLoader(GLTFLoader, '/village/map/scene.gltf')
  return (
    <group 
      scale={[0.01,0.01,0.01]} 
      position={props.position ? props.position : [0, 0, 0]}
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

export default GameMap;
