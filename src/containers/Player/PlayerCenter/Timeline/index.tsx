import React from 'react'
import { useAppSelector } from '../../../../utils/customRedux'
import { formatDuration } from '../../../../utils/formatTime'
import DragBar from '../../DragBar'

const Timeline: React.FC = () => {
  const duration = useAppSelector((state) => state.audio.duration)
  const currentTime = useAppSelector((state) => state.audio.currentTime)

  return (
    <div className='player-timeline flex justify-between items-center text-[color:var(--white)] px-1'>
      <span className='time-start text-xs font-bold min-w-[45px] flex-shrink-0 opacity-50 text-right mr-3'>
        { currentTime > 0 ? formatDuration(currentTime) : '00:00' }
      </span>
      <DragBar />
      <span className='time-end text-xs font-bold min-w-[45px] flex-shrink-0 opacity-50 text-left ml-3'>
      { duration && formatDuration(duration) }
      </span>
    </div>
  )
}

export default Timeline
