import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useGraph} from '@react-three/fiber'
import { useControls } from '../utils/useControls'
import * as THREE from 'three';
import { Html, PerspectiveCamera, useGLTF, useAnimations } from "@react-three/drei"
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'

function Champion(props) {
  const group = useRef()
  const { scene, animations, materials } = useGLTF("/characters/bot.glb");
  const { actions } = useAnimations(animations, group);
  const [action, setAction] = useState('idle');
  const [life, setLife] = useState(props.life? props.life : 10);
  const name = props.name ? props.name : 'robot';

  const previousAction = usePrevious(action);
  const controls = useControls()

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)

  useEffect(() => {
    // setInterval(() => {
    //   setLife(life => life - 1)
    // }, 200);
    console.log(props.target);
    // console.log(nodes, materials);
  }, []);

  useEffect(() => {
    // agree, headShake, idle, run, sad_pose, sneak_pose, walk
    if (previousAction) {
      actions[previousAction].fadeOut(0.2);
      actions[action].stop();
    }
    actions[action].play();
    actions[action].fadeIn(0.2);
  }, [actions, action, previousAction]);
  
  useFrame(() => {
    const { 
      forward, 
      backward, 
      left, 
      right,
      attack,
      sepllq,
      spellw,
      spelle,
      spellr,
    } = controls.current
    // for player movement
    if (forward) {
      setAction('run')
      group.current.position.z += 0.05;
    } 
    else if (backward) {
      setAction('run')
      group.current.position.z -= 0.05;
    }
    else if (left) {
      setAction('walk')
      group.current.position.x += 0.05;
    }
    else if (right) {
      setAction('walk')
      group.current.position.x -= 0.05;
    }
    else if (attack) {
      setAction('agree')
    }
    // for player attack || casting spell
    else {
      setAction('idle')
    }
  })

  var hitGeom = new THREE.BoxBufferGeometry(props.position.x, props.position.y, props.position.z);
  var hitMat = new THREE.MeshBasicMaterial({visible: false});
  // ...

  return life >= 0 ? (
    <group ref={group} {...props} dispose={null} 
      onClick={(e) => {
        e.stopPropagation();
        console.log('zenmeshuo', group);
        group.current.position.z += 1;
      }}>
        <mesh geometry={hitGeom} material={hitMat}></mesh>
        <group scale={[0.01, 0.01, 0.01]} >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh geometry={nodes.Beta_Joints.geometry} material={materials['Beta_Joints_MAT']} skeleton={nodes.Beta_Joints.skeleton} />
          <skinnedMesh geometry={nodes.Beta_Surface.geometry} material={materials['asdf1:Beta_HighLimbsGeoSG2']} skeleton={nodes.Beta_Surface.skeleton} />
        </group>
        <Html>
          <div>{name}</div>
          <div>{life}</div>
        </Html>
    </group>
  ) : null;
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

export default Champion;
