import React from "react";
import * as THREE from "three";

const Terrain = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
      <planeBufferGeometry args={[50, 50]} />
      <meshBasicMaterial color="green" side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Terrain;
