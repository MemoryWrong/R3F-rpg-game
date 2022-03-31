import React, {useState} from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Plane } from "@react-three/drei";

const Terrain = () => {
  const height = useLoader(THREE.TextureLoader, "hmap2.png");
  const [wireframe, setWireframe] = useState(false)
  // const normals = useLoader(THREE.TextureLoader, "normals.png");
  // const colors = useLoader(THREE.TextureLoader, "colors.png");

  return (
    <group>
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}
        args={[64, 64, 1024, 1024]}
        onClick={(event) => setWireframe(!wireframe)}
      >
        <meshStandardMaterial
          wireframe={wireframe}
          // roughness={1}
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
