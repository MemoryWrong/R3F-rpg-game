import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useGraph, useLoader, useThree} from '@react-three/fiber'
import { useControls } from '../utils/useControls'
import * as THREE from 'three';
import useStore from '../engine/store';
import { Html, PerspectiveCamera } from "@react-three/drei";
import { useFBX, useGLTF } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

function Player(props) {
  const playerRef = useRef()
  // const gltf = useLoader(GLTFLoader, '/village/car/scene.gltf')

  // can only put constants here
  // because set / get in useStore will 
  // re-render those let / vars which will not be stored
  const [color, setColor] = useState('green');
  const controls = useControls();
  const { camera } = useThree()
  const velocity = 0.05;
  // const pos = mutation.position.clone()


  // TESTING
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0))
  points.push(new THREE.Vector3(0, 0, -1))
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  /**
   * update camera position
   * to always sit behind the player
   * and look at player
   */
  const updateCamera = () => {
    if(camera !== undefined) {
      const headingRad = playerRef.current.rotation.y;
      camera.rotation.copy(playerRef.current.rotation)
      camera.position.copy(playerRef.current.position)
      // set camera behind by apply vector
      camera.position.x += Math.sin(headingRad) * 5
      camera.position.y = 3
      camera.position.z += Math.cos(headingRad) * 5
      camera.updateProjectionMatrix()
    }
  }

  /**
   * use keyboard control to 
   * move the player
   */
  const updateMove = () => {
    const headingRad = playerRef.current.rotation.y;
    const { 
      forward, 
      backward, 
      left, 
      right,
    } = controls.current
    if (forward) {
      playerRef.current.position.x -= Math.sin(headingRad) * velocity;
      playerRef.current.position.z -= Math.cos(headingRad) * velocity;
    } 
    else if (backward) {
      playerRef.current.position.x += Math.sin(headingRad) * velocity;
      playerRef.current.position.z += Math.cos(headingRad) * velocity;
    }
    else if (left) {
      // headingRad += 0.05;
      playerRef.current.rotation.y += 0.05;
    }
    else if (right) {
      // headingRad -= 0.05;
      playerRef.current.rotation.y -= 0.05;
    }
  }

  useFrame(() => {
    updateMove();
    // updateCamera();
  })

  return (
    <mesh 
      ref={playerRef} 
      position={props.position ? props.position : [0, 0.5, 0]} 
      {...props} 
      castShadow 
      receiveShadow
      onPointerOver={() => setColor('lightgreen')}
      onPointerLeave={() => setColor('green')}
    >
      {/* for testing show heading of player */}
      {/* <PerspectiveCamera position={[0, 5, 30]} near={0.01} far={1000} /> */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'red'} linewidth={10} linecap={'round'} linejoin={'round'} />
      </line>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={color} roughness={0} metalness={0.1} />
      {/* <primitive object={gltf.scene} /> */}
    </mesh>
  )
}

export default Player;
