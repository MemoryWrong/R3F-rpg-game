import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
// import { useRaycastVehicle } from '@react-three/cannon'
import { useControls } from './utils/useControls'

function Vehicle({ props }) {
  const mesh = useRef()
  const controls = useControls()

  useFrame(() => {
    const { forward, backward, left, right } = controls.current
    if(forward || backward ) {
      forward? mesh.current.position.x += 0.1 : mesh.current.position.x += -0.1;
    }
    if(left || right ) {
      left? mesh.current.position.z += 0.1 : mesh.current.position.z += -0.1;
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
      >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  )
}

export default Vehicle
