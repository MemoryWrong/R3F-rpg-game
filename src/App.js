import * as THREE from 'three'
import React, { useRef, useEffect, useState, createRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css';
import Terrain from './3d/Terrain';
import Player from './3d/Player';
import Enemy from './3d/Enemy';
import { OrbitControls, GizmoHelper, GizmoViewport, PerspectiveCamera } from "@react-three/drei";
import useStore from './engine/store';
import { softShadows } from "@react-three/drei"

softShadows()

function App() {
  const {
    enemys,
    enemy,
    test,
    actions,
    mutation,
  } = useStore(state => state);
  
  // useEffect(() => {
  //   console.log(enemys, enemy);
  // }, [enemy, enemys]);

  return (
    <>
      <Canvas 
        shadows 
        onPointerMove={actions.updateMouse} 
        onClick={actions.shoot}
        camera={mutation.camera}
        onCreated={({ gl }) => {
          actions.init()
          gl.setClearColor(new THREE.Color('grey'))
        }}
      >
      <axesHelper />
      {/* <OrbitControls autoRotate={false} minPolarAngle={Math.PI / 2.4} maxPolarAngle={Math.PI / 2.4} /> */}
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
      <ambientLight />
      <Player />
      {
        enemys && enemys.map((e, i) => (
          <Enemy key={i} {...e} position={e.position} />
        ))
      }
      <Terrain />
      </Canvas>
      <div style={{ color: 'white', position: 'absolute', top: 30, left: 40 }}>
        <h3>HUD</h3>
        {
          enemy && 
          <>
            <p>enemy name: {enemy.props.name}</p>
            <p>enemy id: {enemy.props.id}</p>
          </>
        }
      </div>
    </>
  )
}
export default App;