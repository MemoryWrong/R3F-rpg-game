import * as THREE from 'three'
import React, { Suspense, useRef, useEffect, useState, createRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css';
import Terrain from './3d/Terrain';
import Player from './3d/Player';
import Enemy from './3d/Enemy';
import { Sky, OrbitControls, GizmoHelper, GizmoViewport, PerspectiveCamera } from "@react-three/drei";
import useStore from './engine/store';
import { softShadows, PointerLockControls, FirstPersonControls, Cloud } from "@react-three/drei"
import Particles from './3d/Particles'
import GameMap from './3d/GameMap'

softShadows()

function App() {
  const {
    enemys,
    enemy,
    actions,
    mutation,
  } = useStore(state => state);
  
  return (
    <>
      <Canvas 
        shadows 
        // onPointerMove={actions.updateMouse} 
        // onClick={actions.shoot}
        // linear
        // mode="concurrent"
        dpr={[1, 1.5]}
        camera={{ position: [0, 3, 5], near: 0.01, far: 10000 }}
        gl={{ antialias: false }}
        onCreated={({ gl, camera }) => {
          actions.init(camera)
          gl.setClearColor(new THREE.Color('grey'))
        }}
      >
        {/* Development */}
        {/* <axesHelper /> */}
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
        {/* <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} /> */}
        <ambientLight />
        <Sky sunPosition={[100, 20, 100]} />
        <GameMap />
        <Particles />
        <Suspense fallback={null}>
          <Player />
          {/* {
            enemys && enemys.map((e, i) => (
              <Enemy key={i} {...e} position={e.position} />
            ))
          } */}
        </Suspense>
        {/* <Terrain /> */}
        {/* <Cloud
          position={[0, 10, 0]}
          opacity={0.5}
          speed={1} // Rotation speed
          width={1} // Width of the full cloud
          depth={1.5} // Z-dir depth
          segments={20} // Number of particles
        /> */}
        {/* <PointerLockControls /> */}
        <OrbitControls autoRotate={false} minPolarAngle={Math.PI / 2.4} maxPolarAngle={Math.PI / 2.4} />
      </Canvas>
      <div style={{ color: 'white', position: 'absolute', top: 30, left: 40 }}>
        <h3>HUD</h3>
        <div>
          <p>A, W, S, D move</p>
          <p>enemy name: {enemy?.props.name}</p>
          <p>enemy id: {enemy?.props.id}</p>
        </div>
      </div>
    </>
  )
}
export default App;