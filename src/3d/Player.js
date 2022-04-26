import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useGraph, useThree} from '@react-three/fiber'
import { useControls } from '../utils/useControls'
import * as THREE from 'three';

function Player(props) {
  const playerRef = useRef()
  const [color, setColor] = useState('green');
  const controls = useControls();
  const { camera } = useThree()
  let headingRad = 0;
  const velocity = 0.05;

  const points = [];
  points.push(new THREE.Vector3(0, 0, 0))
  points.push(new THREE.Vector3(0, 0, -1))
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  useFrame(() => {
    // update rotate
    // camera.rotation.copy(playerRef.current.rotation)
    // console.log(headingRad);
    // control movement
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
      headingRad += 0.05;
      playerRef.current.rotation.y = headingRad;
    }
    else if (right) {
      headingRad -= 0.05;
      playerRef.current.rotation.y = headingRad;
    }
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
      {/* <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} /> */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'red'} linewidth={10} linecap={'round'} linejoin={'round'} />
      </line>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={color} roughness={0} metalness={0.1} />
    </mesh>
  )
}

export default Player;
