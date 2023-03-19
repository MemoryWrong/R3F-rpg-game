import { useRef, useEffect, useState, useMemo, forwardRef } from 'react'
import { useFrame, useGraph, useLoader, useThree} from '@react-three/fiber'
import { useControls } from '../utils/useControls'
import * as THREE from 'three';
import useStore from '../engine/store';
import { Box, Html, PerspectiveCamera, useAnimations, RoundedBox } from "@react-three/drei";
import { useFBX, useGLTF } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'
import { useBox, useSphere } from "@react-three/cannon"

function Player(props) {
  const playerRef = useRef()

  // can only put constants here
  // because set / get in useStore will
  // re-render those let / vars which will not be stored
  const controls = useControls();
  const { camera } = useThree()
  const velocity = 0.05;
  // const pos = mutation.position.clone()

  /**
   * animations settings
   */
  const { scene, animations, materials } = useGLTF("/characters/character.glb");
  const { actions } = useAnimations(animations, playerRef);
  const [action, setAction] = useState('Run_front');
  const previousAction = usePrevious(action);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)

  /**
   * TESTING
   * for player direction display
   */
  // const points = [];
  // points.push(new THREE.Vector3(0, 0, 0))
  // points.push(new THREE.Vector3(0, 0, -1))
  // const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

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
      camera.position.x -= Math.sin(headingRad) * 10
      camera.position.y = 3
      camera.position.z -= Math.cos(headingRad) * 10
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
      attack,
      forward,
      backward,
      left,
      right,
      jump
    } = controls.current
    if (forward) {
      setAction('Run_front')
      playerRef.current.position.x += Math.sin(headingRad) * velocity;
      playerRef.current.position.z += Math.cos(headingRad) * velocity;
    }
    else if (backward) {
      setAction('Run_back')
      playerRef.current.position.x -= Math.sin(headingRad) * velocity;
      playerRef.current.position.z -= Math.cos(headingRad) * velocity;
    }
    else if (left) {
      setAction('Run_left')
      playerRef.current.rotation.y += 0.05;
    }
    else if (right) {
      setAction('Run_right')
      playerRef.current.rotation.y -= 0.05;
    }
    else if (attack) {
      setAction('Attack')
    }
    else if (jump) {
      setAction('Jump')
    }
    else {
      setAction('Idle')
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

  const PlayerShape = forwardRef(({ children, transparent = false, opacity = 1, color = 'white', args = [1, 1, 1], ...props }, ref) => {
    return (
      <RoundedBox args={args} receiveShadow castShadow ref={ref} {...props}>
        <meshStandardMaterial color={color} transparent={transparent} opacity={opacity} />
        {children}
      </RoundedBox>
    )
  })

  return (
    <group
      ref={playerRef}
      // position={props.position ? props.position : [0, 0, 0]}
      {...props}
      castShadow
      receiveShadow
    >
      {/* for testing show heading of player */}
      {/* <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'red'} linewidth={10} linecap={'round'} linejoin={'round'} />
      </line> */}
      <mesh scale={[0.01, 0.01, 0.01]} position={[0, 0, 0]} >
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh geometry={nodes.Maria_J_J_Ong.geometry} material={materials['maria_M1']} skeleton={nodes.Maria_J_J_Ong.skeleton} />
      </mesh>
      {/* <PlayerShape scale={[1,2,1]} position={[0, 1, 0]} opacity={0.7} transparent={true} /> */}
    </group>
  )
}

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
