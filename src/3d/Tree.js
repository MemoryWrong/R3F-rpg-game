import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { usePlane } from "@react-three/cannon"
import grass from "../assets/grass.jpg"

const Ground = (props) => {
  const [ref] = usePlane(() => ({ position:[0, 0, 0], rotation: [-Math.PI / 2, 0, 0], ...props }))
  const texture = useLoader(THREE.TextureLoader, grass)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} map-repeat={[240, 240]} color="grey" />
    </mesh>
  )
}

export default Ground;