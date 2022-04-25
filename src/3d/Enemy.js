import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useGraph} from '@react-three/fiber'
import useStore from '../engine/store';

function Enemy(props) {
  const enemyRef = useRef()
  const [color, setColor] = useState('blue');
  const {
    setEnemy
  } = useStore(state => state.actions);
  
  useFrame(() => {
  })

  return (
    <mesh 
      ref={enemyRef} 
      position={props.position ? props.position : [0, 0.5, 0]} 
      castShadow 
      receiveShadow
      onClick={(enemyRef) => setEnemy({
        props: props,
        ref: enemyRef,
      })}
      onPointerOver={() => setColor('lightblue')}
      onPointerLeave={() => setColor('blue')}
      >
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshStandardMaterial attach="material" color={color} roughness={0} metalness={0.1} />
    </mesh>
  )
}

export default Enemy;
