import { useEffect } from 'react'

export default function useOnClickOutside(ElementRef: any, handler: Function) {
  useEffect(() => {
    const listener = (e: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ElementRef.current || ElementRef.current.contains(e.target)) {
        return
      }
      handler(e)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ElementRef, handler])
}
