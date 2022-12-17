import React, { useRef } from 'react'
interface DragBarProps {
  width: string,
  height: string,
  hoverHeight: string,
  currentPercent: number,
  percentUpdate: (value: number) => void
}

const DragBar: React.FC<DragBarProps> = ({ width, height, hoverHeight, currentPercent, percentUpdate }) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  return (
    <span 
      className={`drag-bar min-w-[50px] flex-1 h-[${height}] hover:h-[${hoverHeight}] bg-white bg-opacity-50 rounded-2xl transition cursor-pointer relative`}
      style={{ width: `${width}`}}
      ref={sliderRef}
      onMouseDown={(e) => {
        if (sliderRef.current) {
 
          let percentSliderWidth  = ((e.clientX - sliderRef.current.getBoundingClientRect().left) / sliderRef.current.offsetWidth) * 100

          percentSliderWidth = percentSliderWidth < 0
            ? 0
            : percentSliderWidth > 100
            ? 100
            : percentSliderWidth
          percentUpdate(percentSliderWidth)
        }
      }}>
      <div 
        className={`drag-slider h-full top-0 left-0 bg-[color:var(--primary-light)] rounded-[inherit]`} 
        style={{width: `${currentPercent}%`}}
      />
      <div 
        className={`drag-circle absolute w-4 h-4 rounded-full top-1/2 bg-[color:var(--primary-light)] -translate-y-1/2`} 
        style={{ left: `${currentPercent}%`}} />
    </span>
  )
}

export default DragBar
