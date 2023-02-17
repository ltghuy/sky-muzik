import React, { useContext } from 'react'
import { AudioContext } from '../..'
import { useAudioStore } from '../../../../store/useAudioStore'
import { ReactComponent as VolumnOff } from '../../../../static/icons/volume-off.svg'
import { ReactComponent as VolumnOn } from '../../../../static/icons/volume-on.svg'
import DragBar from '../../DragBar'

const VolumnControl: React.FC = () => {
  const { isMute, volume, changeVolumeIcon, setVolume } = useAudioStore()
  const audioRef = useContext(AudioContext)

  const handleTurnVolume = () => {
    if (isMute) {
      changeVolumeIcon(false)
      setVolume(Number(localStorage.getItem("volume")) || 0.5)
      if (audioRef) {
        audioRef.volume = Number(localStorage.getItem("volume") || 0.5)
      }
    } else {
      changeVolumeIcon(true)
      setVolume(0)
      if (audioRef) audioRef.volume = 0
    }
  }

  const updateVolume = (value: number) => {
    if (audioRef) {
      localStorage.setItem("volume", String(value / 100))
      setVolume(value / 100)
      audioRef.volume = value / 100
    }
  }

  return (
    <div className='flex items-center'>
      <button
        className='mv-button text-[color:var(--white)] button-hover mr-1 transition'
        onClick={handleTurnVolume}>
        { isMute ? <VolumnOff className='w-5 h-5' /> : <VolumnOn className='w-5 h-5' /> }
      </button>
      <DragBar 
        width='100px'
        height='3px'
        currentPercent={Number(volume) * 100}
        percentUpdate={updateVolume}
      />
    </div>
  )
}

export default VolumnControl
