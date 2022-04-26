import create from 'zustand'
import * as THREE from 'three'

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
  return new THREE.Vector3(Math.random() * 100 - 50, 0.5, Math.random() * 100 - 50)
}

const useStore = create((set, get) => {
  return {
    // objects loaded in the scene
    enemys: genEnemys(),
    enemy: null, // current enemy
    actions: {
      init: () => {
        // init camera
        get().mutation.camera.position.x = 0;
        get().mutation.camera.position.y = 5;
        get().mutation.camera.position.z = 30;
      },
      setEnemy: (e) => {
        set({enemy: e})
      },
      shoot: (enemy) => {
        console.log(get().enemy);
        // get().mutation.camera.lookAt({x: 0, y: 0, z:0})
        // get().mutation.camera.rotation.y += 0.1;

      },
      updateMouse: ({clientX: x, clientY: y}) => { 
        // get().mutation.mouse.set(x - window.innerWidth / 2, y - window.innerHeight / 2)
        // get().mutation.mouse.x = ( x / window.innerWidth ) * 2 - 1;
	      // get().mutation.mouse.y = - ( y / window.innerHeight ) * 2 + 1;
      }
    },
    mutation: {
      ray: new THREE.Ray(),
      mouse: new THREE.Vector2(0, 0),
      raycaster: new THREE.Raycaster(),
      camera: new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 10000 ),
    }
  }
})


export default useStore
