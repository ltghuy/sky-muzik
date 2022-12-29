import { useEffect, useState } from "react"

const useInfinityScroll = ( eleScroll: string, eleTracking: string, handler: Function ) => {
  const [timeScroll, setTimeScroll] = useState<number>(0)

  const isBottom = (ele: HTMLElement) => {
    return ele.getBoundingClientRect().bottom <= window.innerHeight
  }

  const trackingScrolling = () => {
    const tracking = document.querySelector(eleTracking) as HTMLElement
    const ele = document.querySelector(eleScroll) as HTMLElement
    if (isBottom(tracking)) {
      handler()
      ele.removeEventListener('scroll', trackingScrolling)
      setTimeScroll(timeScroll => timeScroll + 1)
    }
  }

  useEffect(() => {
    const ele = document.querySelector(eleScroll) as HTMLElement
    ele.addEventListener('scroll', trackingScrolling)
    return () => {
      ele.removeEventListener('scroll', trackingScrolling)
    }
  }, [timeScroll])

  return 
}

export default useInfinityScroll
