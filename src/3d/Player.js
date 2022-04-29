import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useGraph, useLoader, useThree} from '@react-three/fiber'
import { useControls } from '../utils/useControls'
import * as THREE from 'three';
import useStore from '../engine/store';
import { Html, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { useFBX, useGLTF } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'

function Player(props) {
  const playerRef = useRef()
  const gltf = useLoader(GLTFLoader, '/characters/character.glb')

  // can only put constants here
  // because set / get in useStore will 
  // re-render those let / vars which will not be stored
  const [color, setColor] = useState('green');
  const controls = useControls();
  const { camera } = useThree()
  const velocity = 0.05;
  // const pos = mutation.position.clone()

  const { scene, animations, materials } = useGLTF("/characters/bot.glb");
  const { actions } = useAnimations(animations, playerRef);
  const [action, setAction] = useState('idle');
  const previousAction = usePrevious(action);
  
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)
  console.log(nodes, materials, animations);

  // TESTING
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0))
  points.push(new THREE.Vector3(0, 0, -1))
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  /**
   * update camera position
   * to always sit behind the player
   * and look at player
   */
  const updateCamera = () => {
    if(camera !== undefined) {
      const headingRad = playerRef.current.rotation.y;
      camera.rotation.copy(playerRef.current.rotation)
      camera.position.copy(playerRef.current.position)
      // set camera behind by apply vector
      camera.rotation.y -= Math.PI;
      camera.position.x -= Math.sin(headingRad) * 5
      camera.position.y = 3
      camera.position.z -= Math.cos(headingRad) * 5
      camera.updateProjectionMatrix()
    }
  }

  /**
   * use keyboard control to 
   * move the player
   */
  const updateMove = () => {
    const headingRad = playerRef.current.rotation.y;
    const { 
      forward, 
      backward, 
      left, 
      right,
    } = controls.current
    if (forward) {
      setAction('run')
      playerRef.current.position.x += Math.sin(headingRad) * velocity;
      playerRef.current.position.z += Math.cos(headingRad) * velocity;
    } 
    else if (backward) {
      setAction('run')
      playerRef.current.position.x -= Math.sin(headingRad) * velocity;
      playerRef.current.position.z -= Math.cos(headingRad) * velocity;
    }
    else if (left) {
      // headingRad += 0.05;
      setAction('run')
      playerRef.current.rotation.y += 0.05;
    }
    else if (right) {
      // headingRad -= 0.05;
      setAction('run')
      playerRef.current.rotation.y -= 0.05;
    }
    else {
      setAction('idle')
    }
  }

  useFrame(() => {
    updateMove();
    updateCamera();
  })

  useEffect(() => {
    // console.log(nodes);
  })

  useEffect(() => {
    // agree, headShake, idle, run, sad_pose, sneak_pose, walk
    if (previousAction) {
      actions[previousAction].fadeOut(0.2);
      actions[action].stop();
    }
    actions[action].play();
    actions[action].fadeIn(0.2);
  }, [actions, action, previousAction]);
  
  var hitGeom = new THREE.BoxBufferGeometry(0, 0, 0);
  var hitMat = new THREE.MeshBasicMaterial({visible: false});

  return (
    <group 
      ref={playerRef} 
      position={props.position ? props.position : [0, 0.5, 0]}
      {...props} 
      castShadow 
      receiveShadow
      onPointerOver={() => setColor('lightgreen')}
      onPointerLeave={() => setColor('green')}
    >
      {/* for testing show heading of player */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'red'} linewidth={10} linecap={'round'} linejoin={'round'} />
      </line>
      {/*<boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={color} roughness={0} metalness={0.1} /> */}
      
      {/* <primitive object={gltf.scene} /> */}
      {/* <mesh geometry={hitGeom} material={hitMat}></mesh> */}
      <mesh geometry={hitGeom} material={hitMat}></mesh>
      <group scale={[0.01, 0.01, 0.01]} >
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh geometry={nodes.Beta_Joints.geometry} material={materials['Beta_Joints_MAT']} skeleton={nodes.Beta_Joints.skeleton} />
        <skinnedMesh geometry={nodes.Beta_Surface.geometry} material={materials['asdf1:Beta_HighLimbsGeoSG2']} skeleton={nodes.Beta_Surface.skeleton} />
      </group>
    </group>
  )
}

useGLTF.preload("/characters/bot.glb");

const usePrevious = (value) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); 
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default Player;
