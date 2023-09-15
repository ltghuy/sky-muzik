import React, { useContext } from 'react'
import { AudioContext } from '../..'
import { useAudioStore } from '@stores/useAudioStore'
import DragBar from '@containers/Player/DragBar'
import { formatDuration } from '@utils/formatTime'


const Timeline: React.FC = () => {
  const { duration, currentTime } = useAudioStore()
  const audioRef = useContext(AudioContext)

  const updateCurrentVolume = (value: number) => {
    if (audioRef) {
      audioRef.currentTime = (value / 100) * audioRef.duration
    }
  }

  return (
    <div className='player-timeline flex justify-between items-center text-[color:var(--white)] px-1'>
      <span className='time-start text-xs font-bold min-w-[45px] flex-shrink-0 opacity-50 text-right mr-4'>
        {currentTime > 0 ? formatDuration(currentTime) : '00:00'}
      </span>
      <DragBar
        width='100%'
        height='3px'
        currentPercent={(currentTime / duration) * 100}
        percentUpdate={updateCurrentVolume}
      />
      <span className='time-end text-xs font-bold min-w-[45px] flex-shrink-0 opacity-50 text-left ml-4'>
        {duration > 0 ? formatDuration(duration) : '00:00'}
      </span>
    </div>
  )
}

export default Timeline
