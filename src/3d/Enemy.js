import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { useFrame, useGraph, useThree} from '@react-three/fiber'
import useStore from '../engine/store';

function Enemy(props) {
  const { camera } = useThree()
  const ref = useRef()
  const [color, setColor] = useState('blue');
  const {
    setEnemy,
  } = useStore(state => state.actions);
  
  const {
    enemy,
  } = useStore(state => state);
  

  useFrame(() => {
  })

  const onClick = useCallback((e) => {
    e.stopPropagation()
    // const { x, y, z } = ref.current.position
    // const dir = [
    //   [x + 1, y, z],
    //   [x - 1, y, z],
    //   [x, y + 1, z],
    //   [x, y - 1, z],
    //   [x, y, z + 1],
    //   [x, y, z - 1],
    // ]
    // addCube(...dir[Math.floor(e.faceIndex / 2)])
    setEnemy({props})
    console.log('after', camera.position, camera.rotation);
  }, [])

  return (
    <mesh 
      ref={ref} 
      position={props.position ? props.position : [0, 0.5, 0]} 
      castShadow 
      receiveShadow
      onClick={(e) => {
        console.log(enemy);
        // setEnemy({props: props})
        onClick(e)
      }}
      onPointerOver={() => {
        setColor('purple')
        // setEnemy({props: props})
      }}
      onPointerLeave={() => setColor('blue')}
      >
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshStandardMaterial attach="material" color={color} roughness={0} metalness={0.1} />
    </mesh>
  )
}

export default Enemy;
