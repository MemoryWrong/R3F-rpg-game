import React, { useRef, useEffect, useState, createRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css';
import Terrain from './3d/Terrain';
import Champion from './3d/Champion';
import { OrbitControls, GizmoHelper, GizmoViewport, PerspectiveCamera } from "@react-three/drei";
import useStore from './store';

function App() {
  const lightPos = [0, 10, 0];
  const audio = new Audio('/sounds/wow.mp3');
  const [enemy, setEnemy] = useState({
    life: 10,
    name: 'enemy'
  });

  const {test} = useStore(state => state);
  const {update} = useStore(state => state);
  const bears = useStore(state => state.bears)
  const increasePopulation = useStore(state => state.increasePopulation)
  
  const playAudio = () => {
    // audio.play();
    increasePopulation()
    update('fkn yeah');
  }

  useEffect(() => {
    console.log(test);
  }, []);

  return (
    <>
    <Canvas>
      <axesHelper />
      <OrbitControls autoRotate={false} minPolarAngle={Math.PI / 2.4} maxPolarAngle={Math.PI / 2.4} />
      {/* <PerspectiveCamera makeDefault position={[0, 100, 0]} /> */}
      <pointLight  intensity={5} position={lightPos} />
      <ambientLight />
      <Terrain />
      <Champion key={0} position={[0, 0, 0]}/>
      <Champion key={1} position={[3, 0, 0]} {...enemy}/>
      <Champion key={2} position={[5, 0, 0]} {...enemy} />
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