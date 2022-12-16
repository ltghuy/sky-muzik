import React, { useContext } from 'react'
import { AudioContext } from '../..'
import { useAppDispatch, useAppSelector } from '../../../../utils/customRedux'
import { changePlayIcon } from '../../../../redux/features/audioSlice'
import { ReactComponent as PlayIcon } from '../../../../static/icons/play-solid.svg'
import { ReactComponent as PauseIcon } from '../../../../static/icons/pause-solid.svg'

const PlayControl: React.FC = () => {
  const isPlay = useAppSelector((state) => state.audio.isPlay)
  const audioRef = useContext(AudioContext)
  const dispatch = useAppDispatch()
  const handlePlaySong = () => {
    if (isPlay) {
      dispatch(changePlayIcon(false))
      if(audioRef) {
        audioRef.pause()
      }
    } else {
      dispatch(changePlayIcon(true))
      if(audioRef) {
        audioRef.play()
      }
    }
  }

  return (
    <button 
      className='w-12 h-12 text-[color:var(--white)] hover:text-[color:var(--primary-light)] transition border border-current rounded-full flex justify-center items-center'
      onClick={handlePlaySong} >
      {isPlay ? <PauseIcon className='w-4' /> : <PlayIcon className='w-4 ml-1' />}  
    </button>
  )
}

export default PlayControl
