import React from "react";
import * as THREE from "three";

const Terrain = () => {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial color={'grey'} />
      </mesh>
    </group>
  );
};

export default Terrain;
