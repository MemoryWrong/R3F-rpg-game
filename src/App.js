import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css';
import Terrain from './scene/Terrain';
import Champion from './Champion';
import { OrbitControls, GizmoHelper, GizmoViewport, PerspectiveCamera } from "@react-three/drei";

function App() {
  const lightPos = [0, 10, 0];
  const audio = new Audio('/sounds/wow.mp3');

  const playAudio = () => {
    audio.play();
  }

  return (
    <>
    <Canvas>
      <axesHelper />
      <OrbitControls autoRotate={false} minPolarAngle={Math.PI / 2.4} maxPolarAngle={Math.PI / 2.4} />
      {/* <PerspectiveCamera makeDefault position={[0, 100, 0]} /> */}
      <pointLight  intensity={5} position={lightPos} />
      <ambientLight />
      <Terrain />
      <Champion position={[0, 0, 0]} />
    </Canvas>
    <div style={{ color: 'white', position: 'absolute', top: 30, left: 40 }}>
      <pre>
        Must run fullscreen!
        <br /> arrow key to move
        <br /> W / E to switch wireframe on / off
        <br /><button onClick={() => playAudio()}>play Music</button>
      </pre>
    </div>
    </>
  )
}
export default App;