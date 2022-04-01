import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
// import { useRaycastVehicle } from '@react-three/cannon'
import { useControls } from './utils/useControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from "@react-three/fiber";

function Champion({ props }) {
  const mesh = useRef()
  const gltf = useLoader(GLTFLoader, '/scene.gltf');
  const controls = useControls()

  useFrame(() => {
    const { forward, backward, left, right } = controls.current
    if(forward || backward ) {
      forward? mesh.current.position.z += 0.01 : mesh.current.position.z += -0.01;
    }
    if(left || right ) {
      left? mesh.current.position.x += 0.01 : mesh.current.position.x += -0.01;
    }
  })

  return (
    <primitive
        ref={mesh}
        object={gltf.scene}
        position={[0,0,0]}
        scale={0.0005}
    />
  )
}

export default Champion;
