import React from 'react'
import DragBar from '../../DragBar'

const Timeline: React.FC = () => {
  return (
    <div className='player-timeline flex justify-between items-center text-[color:var(--white)] px-1'>
      <span className='time-start text-xs font-bold min-w-[45px] flex-shrink-0 opacity-50 text-right mr-3'>
        03:01
      </span>
      <DragBar />
      <span className='time-end text-xs font-bold min-w-[45px] flex-shrink-0 opacity-50 text-left ml-3'>
        03:59
      </span>
    </div>
  )
}

export default Timeline
