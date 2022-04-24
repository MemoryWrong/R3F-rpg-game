import React, { useRef, useEffect, useState, createRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css';
import Terrain from './3d/Terrain';
import Player from './3d/Player';
import { OrbitControls, GizmoHelper, GizmoViewport, PerspectiveCamera } from "@react-three/drei";
import useStore from './store';
import { softShadows } from "@react-three/drei"

softShadows()

function App() {
  const lightPos = [0, 10, 0];

  // test for zustand
  // states & setStates
  const {test} = useStore(state => state);
  const {update} = useStore(state => state);
  const bears = useStore(state => state.bears)
  const increasePopulation = useStore(state => state.increasePopulation)
  
  const playAudio = () => {
    increasePopulation()
    update('fkn yeah');
  }

  useEffect(() => {
  }, []);

  return (
    <>
    <Canvas shadows>
      <axesHelper />
      <OrbitControls autoRotate={false} minPolarAngle={Math.PI / 2.4} maxPolarAngle={Math.PI / 2.4} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />
        <ambientLight />
        <Player />
        <Terrain />
      </Canvas>
      <div style={{ color: 'white', position: 'absolute', top: 30, left: 40 }}>
        <pre>
          Must run fullscreen!
          <br /> arrow key to move
          <br /> bears: {bears}
          <br /> test: {test}
          <br /> W / E to switch wireframe on / off
          <br /><button onClick={() => playAudio()}>play Music</button>
        </pre>
      </div>
    </>
  )
}
export default App;