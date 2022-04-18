import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
// import { useRaycastVehicle } from '@react-three/cannon'
import { useControls } from './utils/useControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { useLoader } from "@react-three/fiber";
import { Html, PerspectiveCamera, useGLTF, useAnimations } from "@react-three/drei"

function Champion() {
  const group = useRef()
  const { scene, animations } = useGLTF("/characters/bot.glb");
  const { actions } = useAnimations(animations, group);
  const [action, setAction] = useState('idle');
  const previousAction = usePrevious(action);
  const controls = useControls()

  const WALK_SPEED = 0.5;
  const RUN_SPEED = 1;

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
      console.log(controls, forward);
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
    // for player attack || casting spell
    else {
      setAction('idle')
    }
  })

  return (
    <group
      ref={group}
    >
      {/* use for display player information */}
      {/* <PerspectiveCamera makeDefault /> */}
      <Html distanceFactor={10}>
        <div className="content">
          Robot
        </div>
      </Html>
      <primitive 
        object={scene}
        scale={1}
        position={[0,0,0]}
      />
    </group>
  );
}

const usePrevious = (value) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default Champion;
