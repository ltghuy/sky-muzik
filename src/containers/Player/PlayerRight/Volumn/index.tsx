import React, { useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../utils/customRedux'
import { changeVolumeIcon, setVolume } from '../../../../redux/features/audioSlice'
import { AudioContext } from '../..'
import { ReactComponent as VolumnOff } from '../../../../static/icons/volume-off.svg'
import { ReactComponent as VolumnOn } from '../../../../static/icons/volume-on.svg'
import DragBar from '../../DragBar'

const VolumnControl: React.FC = () => {
  const isVolumeOn = useAppSelector((state) => state.audio.isMute)
  const volume = useAppSelector((state) => state.audio.volume)
  const audioRef = useContext(AudioContext)
  const dispatch = useAppDispatch()

  const handleTurnVolume = () => {
    if (isVolumeOn) {
      dispatch(changeVolumeIcon(false))
      dispatch(setVolume(Number(localStorage.getItem("volume")) || 0.5))
      if (audioRef) {
        audioRef.volume = Number(localStorage.getItem("volume") || 0.5)
      }
    } else {
      dispatch(changeVolumeIcon(true))
      dispatch(setVolume(0))
      if (audioRef) audioRef.volume = 0
    }
  }

  const updateVolume = (value: number) => {
    if (audioRef) {
      localStorage.setItem("volume", String(value / 100))
      dispatch(setVolume(value / 100))
      audioRef.volume = value / 100
    }
  }

  return (
    <div className='flex items-center'>
      <button
        className='mv-button text-[color:var(--white)] button-hover mr-1 transition'
        onClick={handleTurnVolume}>
        { isVolumeOn ? <VolumnOff className='w-5 h-5' /> : <VolumnOn className='w-5 h-5' /> }
      </button>
      <DragBar 
        width='100px'
        height='3px'
        hoverHeight='6px'
        currentPercent={Number(volume) * 100}
        percentUpdate={updateVolume}
      />
    </div>
  )
}

export default VolumnControl
