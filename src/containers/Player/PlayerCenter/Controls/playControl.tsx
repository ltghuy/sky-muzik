import React, { useState } from 'react'
import { ReactComponent as PlayIcon } from '../../../../static/icons/play-solid.svg'
import { ReactComponent as PauseIcon } from '../../../../static/icons/pause-solid.svg'

const PlayControl: React.FC = () => {
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const handlePlaySong = () => {
    console.log('Play button clicked!')
    setIsPlay(isPlay => !isPlay)
  }

  return (
    <button 
      className='w-12 h-12 text-[color:var(--white)] hover:text-[color:var(--primary-light)] transition border border-current rounded-full flex justify-center items-center'
      onClick={handlePlaySong} >
      {isPlay ? <PauseIcon className='w-4' /> : <PlayIcon className='w-4' />}  
    </button>
  )
}

export default PlayControl
