import { useEffect, useRef } from 'react'

export function useKeyPress(target, event) {
  useEffect(() => {
    const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true)
    const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false)
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  })
}

export function useControls() {
  const keys = useRef({ 
    // movement
    stop: true,
    forward: false, 
    backward: false, 
    left: false, 
    right: false,
    // spells || attack
    attack: false,
    sepllq: false,
    spellw: false,
    spelle: false,
    spellr: false,
  })
  useKeyPress(['w'], (pressed) => (keys.current.forward = pressed))
  useKeyPress(['s'], (pressed) => (keys.current.backward = pressed))
  useKeyPress(['a'], (pressed) => (keys.current.left = pressed))
  useKeyPress(['d'], (pressed) => (keys.current.right = pressed))
  useKeyPress([' '], (pressed) => (keys.current.attack = pressed))

  // useKeyPress(['ArrowUp'], (pressed) => (keys.current.forward = pressed))
  // useKeyPress(['ArrowDown'], (pressed) => (keys.current.backward = pressed))
  // useKeyPress(['ArrowLeft'], (pressed) => (keys.current.left = pressed))
  // useKeyPress(['ArrowRight'], (pressed) => (keys.current.right = pressed))
  // useKeyPress(['a'], (pressed) => (keys.current.attack = pressed))
  // useKeyPress(['q'], (pressed) => (keys.current.sepllq = pressed))
  // useKeyPress(['w'], (pressed) => (keys.current.spellw = pressed))
  // useKeyPress(['e'], (pressed) => (keys.current.spelle = pressed))
  // useKeyPress(['r'], (pressed) => (keys.current.spellr = pressed))
  return keys
}
