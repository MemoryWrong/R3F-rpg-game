import create from 'zustand'
import * as THREE from 'three'
// import { Curves } from 'three/examples/jsm/curves/CurveExtras'

let guid = 1
// let spline = new Curves.GrannyKnot()
// let track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true)
let track = new THREE.BoxBufferGeometry(1, 1, 1)

const genEnemys = () => {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push({
      id: i + 1,
      name: `enemy-${i + 1}`,
      position: randomPosition(),
    })
  }
  return arr;
}

const randomPosition = () => {
  return new THREE.Vector3(Math.random() * 100 - 50, 5, Math.random() * 100 - 50)
}

// function randomData(count, track, radius, size, scale) {
//   return new Array(count).fill().map(() => {
//     const t = Math.random()
//     const pos = track.parameters.path.getPointAt(t)
//     pos.multiplyScalar(15)
//     const offset = pos
//       .clone()
//       .add(new THREE.Vector3(-radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2))
//     const speed = 0.1 + Math.random()
//     return { guid: guid++, scale: typeof scale === 'function' ? scale() : scale, size, offset, pos, speed, radius, t, hit: new THREE.Vector3(), distance: 1000 }
//   })
// }


const useStore = create((set, get) => {
  return {
    // objects loaded in the scene
    camera: undefined,
    enemys: genEnemys(),
    enemy: null, // current enemy
    explosions: [],

    actions: {
      init: (camera) => {
        set({ camera })
      },
      setEnemy: (e) => {
        set({enemy: e})
      },
      shoot: (enemy) => {
        console.log(get().enemy);
      },
      updateMouse: ({clientX: x, clientY: y}) => { 
        // get().mutation.mouse.set(x - window.innerWidth / 2, y - window.innerHeight / 2)
        // get().mutation.mouse.x = ( x / window.innerWidth ) * 2 - 1;
	      // get().mutation.mouse.y = - ( y / window.innerHeight ) * 2 + 1;
      }
    },
    mutation: {
      position: new THREE.Vector3(),
      ray: new THREE.Ray(),
      mouse: new THREE.Vector2(0, 0),
      raycaster: new THREE.Raycaster(),
      dummy: new THREE.Object3D(),  
      // particles: randomData(1500, track, 100, 1, () => 0.5 + Math.random() * 0.8),
    }
  }
})


export default useStore
