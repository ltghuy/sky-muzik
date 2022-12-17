import React, { useRef } from 'react'
interface DragBarProps {
  width: string,
  height: string,
  currentPercent: number,
  percentUpdate: (value: number) => void
}

const DragBar: React.FC<DragBarProps> = ({ width, height, currentPercent, percentUpdate }) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  return (
    <span 
      className={`drag-bar min-w-[50px] flex-1 bg-white bg-opacity-50 rounded-2xl transition cursor-pointer relative hover:py-[3px]`}
      style={{ width: `${width}`, height: `${height}`}}
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
        className={`drag-slider absolute h-full top-0 left-0 bg-[color:var(--primary-light)] rounded-[inherit]`} 
        style={{width: `${currentPercent}%`}}
      />
      <div 
        className={`drag-circle absolute w-4 h-4 rounded-full top-1/2 bg-[color:var(--primary-light)] -translate-y-1/2`} 
        style={{ left: `${currentPercent}%`}} />
    </span>
  )
}

export default DragBar
