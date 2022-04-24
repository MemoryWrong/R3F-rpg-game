import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useGraph} from '@react-three/fiber'

function Player(props) {
  const playerRef = useRef()

  useFrame(() => {
  })

  return (
    <mesh ref={playerRef} position={props.position ? props.position : [0, 1, 0]} {...props} castShadow receiveShadow>
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshStandardMaterial attach="material" color="lightblue" roughness={0} metalness={0.1} />
    </mesh>
  )

}

export default Player;
