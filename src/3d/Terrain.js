import React from "react";
import * as THREE from "three";

const Terrain = () => {
  return (
    
    <group>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
        <planeBufferGeometry args={[50, 50]} />
        <meshBasicMaterial color="grey" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" transparent opacity={0.4} />
      </mesh>
    </group>

  );
};

export default Terrain;
