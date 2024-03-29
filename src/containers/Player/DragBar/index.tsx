import React from 'react'
interface DragBarProps {
  width: string,
  height: string,
  currentPercent: number,
  percentUpdate: (value: number) => void
}

const DragBar: React.FC<DragBarProps> = ({ width, height, currentPercent, percentUpdate }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    percentUpdate(Number(event.target.value))
  }

  return (
    <input
      type="range"
      min={0}
      max={100}
      step={0.01}
      value={currentPercent || 0}
      className='drag-bar hover:py-[3px] cursor-pointer opacity-70 outline-none'
      style={{ width: `${width}`, height: `${height}` }}
      onChange={handleChange} />
  )
}

export default DragBar
