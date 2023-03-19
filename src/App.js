import { Canvas } from "@react-three/fiber"
import { Sky, PointerLockControls, OrbitControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import Ground from "./3d/Ground"
import GameMap from "./3d/GameMap"
import Player from "./3d/Player"
import Bot from "./3d/Bot"
import Grass from "./3d/Grass"
import { Cube, Cubes } from "./3d/Cube"

// The original was made by Maksim Ivanow: https://www.youtube.com/watch?v=Lc2JvBXMesY&t=124s
// This demo needs pointer-lock, that works only if you open it in a new window
// Controls: WASD + left click

export default function App() {
  return (
    <Canvas shadows gl={{ alpha: false }} camera={{ fov: 45 }}>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <GameMap />
        {/* <Ground /> */}
        {/* <Grass position={[0, 0, 0]} /> */}
        {/* <Player position={[0, 0, 0]} /> */}
        <Bot position={[0, 0, 0]} />
        {/* <Cube position={[0, 0, 0]} /> */}
        {/* <Cubes /> */}
      </Physics>
      {/* <PointerLockControls /> */}
      <OrbitControls autoRotate={false} minPolarAngle={Math.PI / 2.4} maxPolarAngle={Math.PI / 2.4} />
    </Canvas>
  )
}
