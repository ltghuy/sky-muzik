import { useEffect } from "react"

const useInfinityScroll = ( eleScroll: string, eleTracking: string, handler: Function, dataLength: number ) => {

  const isBottom = (ele: HTMLElement) => {
    return ele.getBoundingClientRect().bottom <= window.innerHeight
  }

  const trackingScrolling = () => {
    const tracking = document.querySelector(eleTracking) as HTMLElement
    const ele = document.querySelector(eleScroll) as HTMLElement
    if (isBottom(tracking)) {
      handler()
      ele.removeEventListener('scroll', trackingScrolling)
    }
  }

  useEffect(() => {
    const ele = document.querySelector(eleScroll) as HTMLElement
    ele.addEventListener('scroll', trackingScrolling)
    return () => {
      ele.removeEventListener('scroll', trackingScrolling)
    }
  }, [dataLength])

  return 
}

export default useInfinityScroll
