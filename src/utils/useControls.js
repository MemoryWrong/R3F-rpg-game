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
  }, [])
}

export function useControls() {
  const keys = useRef({ 
    forward: false, 
    backward: false, 
    left: false, 
    right: false, 
    brake: false, 
    wireframeOn: false,
    wireframeOff: false 
  })
  useKeyPress(['ArrowUp'], (pressed) => (keys.current.forward = pressed))
  useKeyPress(['ArrowDown'], (pressed) => (keys.current.backward = pressed))
  useKeyPress(['ArrowLeft'], (pressed) => (keys.current.left = pressed))
  useKeyPress(['ArrowRight'], (pressed) => (keys.current.right = pressed))
  useKeyPress(['w'], (pressed) => (keys.current.wireframeOn = pressed))
  useKeyPress(['e'], (pressed) => (keys.current.wireframeOff = pressed))
  return keys
}
