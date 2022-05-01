import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { usePlane, useSphere, useBox } from "@react-three/cannon"
import grass from "../assets/grass.jpg"

const Grass = (props) => {
  // const [ref, api] = useSphere(() => ({ mass: 1, type: "Dynamic", position: [0, 10, 0], ...props }))
  const [ref] = useBox(() => ({ type: "Static", ...props }))

  return (
    <mesh 
      ref={ref}
      castShadow 
      receiveShadow
      >
      {/* <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} /> */}
      <boxGeometry args={[5, 10, 5]} />
      <meshStandardMaterial attach="material" color={'green'} roughness={0} metalness={0.1} />
    </mesh>
  )
}

export default Grass;