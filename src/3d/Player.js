import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useGraph} from '@react-three/fiber'
import { useControls } from '../utils/useControls'
function Player(props) {
  const playerRef = useRef()
  const [color, setColor] = useState('green');
  const controls = useControls();

  useFrame(() => {
    const { 
      forward, 
      backward, 
      left, 
      right,
    } = controls.current
    if (forward) {
      playerRef.current.position.z -= 0.05;
    } 
    else if (backward) {
      playerRef.current.position.z += 0.05;
    }
    else if (left) {
      playerRef.current.position.x -= 0.05;
    }
    else if (right) {
      playerRef.current.position.x += 0.05;
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
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshStandardMaterial attach="material" color={color} roughness={0} metalness={0.1} />
    </mesh>
  )
}

export default Player;
