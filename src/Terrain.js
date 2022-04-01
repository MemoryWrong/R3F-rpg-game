import React, {useState} from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Plane } from "@react-three/drei";
import { useControls } from './utils/useControls'

const Terrain = () => {
  const height = useLoader(THREE.TextureLoader, "hmap2.png");
  const [wireframe, setWireframe] = useState(false)
  const controls = useControls()

  useFrame(() => {
    const {wireframeOn, wireframeOff } = controls.current
    if(wireframeOff ) {
      setWireframe(false)
    }
    if(wireframeOn ) {
      setWireframe(true)
    }
  })
  return (
    <group>
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        args={[64, 64, 1024, 1024]}
      >
        <meshStandardMaterial
          wireframe={wireframe}
          color={0xa06851}
          metalness={0.2}
          displacementScale={3}
          attach="material"
          // map={colors}
          // normalMap={normals}
          displacementMap={height}
        />
      </Plane>
    </group>
  );
};

export default Terrain;
