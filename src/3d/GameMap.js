import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useBox } from "@react-three/cannon"

function GameMap(props) {
  // const [ref] = usePlane(() => ({ rotation: [0, 0, 0], ...props }))
  const [ref] = useBox(() => ({ type: "Static", ...props }))

  const gltf = useLoader(GLTFLoader, '/village/map/scene.gltf')
  return (
    <group
      ref={ref}
      scale={[0.01,0.01,0.01]} 
      position={props.position ? props.position : [0, 0, 0]}
    >
      <primitive object={gltf.scene} />
    </group>
  )
}

export default GameMap;
