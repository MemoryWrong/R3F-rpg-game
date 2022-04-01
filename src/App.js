import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css';
import Terrain from './Terrain';
import Champion from './Champion';
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";

function Light(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function App() {
  const lightPos = [0, 3, 5];
  const [play, setPlay] = useState(false)

  return (
    <>
    <Canvas>
      <OrbitControls autoRotate={play} minPolarAngle={Math.PI / 2.4} maxPolarAngle={Math.PI / 2.4} />
      <pointLight  intensity={5} position={lightPos} />
      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
      >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      </GizmoHelper>
      <Terrain />
      <Champion position={[0, 0, 0]} />
    </Canvas>
    <div style={{ color: 'white', position: 'absolute', top: 30, left: 40 }}>
      <pre>
        Must run fullscreen!
        <br />
        <br /> W / E to switch wireframe on / off
        <br /><button onClick={() => setPlay(!play)}>rotate on / off</button>
      </pre>
    </div>
    </>
  )
}
export default App;