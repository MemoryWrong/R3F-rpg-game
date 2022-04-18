import React, {useState} from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Plane } from "@react-three/drei";
import { useControls } from '../utils/useControls'

const Terrain = () => {
  // const height = useLoader(THREE.TextureLoader, "hmap1.png");
  // const [wireframe, setWireframe] = useState(false)
  // const controls = useControls()

  // useFrame(() => {
  //   const {wireframeOn, wireframeOff } = controls.current
  //   if(wireframeOff ) {
  //     setWireframe(false)
  //   }
  //   if(wireframeOn ) {
  //     setWireframe(true)
  //   }
  // })
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
      {/*
        The thing that gives the mesh its shape
        In this case the shape is a flat plane
      */}
      <planeBufferGeometry args={[50, 50]} />
      {/*
        The material gives a mesh its texture or look.
        In this case, it is just a uniform green
      */}
      <meshBasicMaterial color="green" side={THREE.DoubleSide} />
    </mesh>
    // <mesh>
    //   <Plane
    //     rotation={[-Math.PI / 2, 0, 0]}
    //     position={[0, 0, 0]}
    //     args={[50, 50]}
    //   >
    //     {/* <meshStandardMaterial
    //       wireframe={wireframe}
    //       color={0xa06851}
    //       metalness={0.2}
    //       displacementScale={3}
    //       attach="material"
    //       // map={colors}
    //       // normalMap={normals}
    //       displacementMap={height}
    //     /> */}
    //   </Plane>
    // </mesh>
  );
};

export default Terrain;
