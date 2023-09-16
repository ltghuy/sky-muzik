import React, { useCallback, useContext, useMemo } from 'react'
import { AudioContext } from '@containers/Player'
import { useAudioStore } from '@stores/useAudioStore'
import DragBar from '@containers/Player/DragBar'
import { LOCAL_STORAGE_KEYS } from '@constants/localStorageKeys'
import { ReactComponent as VolumeOff } from '@static/icons/volume-off.svg'
import { ReactComponent as VolumeOn } from '@static/icons/volume-on.svg'

const VolumeControl: React.FC = () => {
  const { isMute, volume, changeVolumeIcon, setVolume } = useAudioStore()
  const audioRef = useContext(AudioContext)

  const handleTurnVolume = () => {
    if (isMute) {
      changeVolumeIcon(false)
      setVolume(Number(localStorage.getItem(LOCAL_STORAGE_KEYS.VOLUME)) || 0.5)
      if (audioRef) {
        audioRef.volume = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.VOLUME) || 0.5)
      }
    } else {
      changeVolumeIcon(true)
      setVolume(0)
      if (audioRef) audioRef.volume = 0
    }
  }

  const updateVolume = useCallback((value: number) => {
    if (audioRef) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.VOLUME, String(value / 100))
      setVolume(value / 100)
      audioRef.volume = value / 100
    }
  }, [audioRef])

  const getCurrentPercent = useMemo(() => {
    return Number(volume) * 100
  }, [volume])

  return (
    <div className='flex items-center'>
      <button
        className='mv-button text-[color:var(--white)] button-hover mr-1 transition'
        onClick={handleTurnVolume}>
        {isMute ? <VolumeOff className='w-5 h-5' /> : <VolumeOn className='w-5 h-5' />}
      </button>
      <DragBar
        width='100px'
        height='3px'
        currentPercent={getCurrentPercent}
        percentUpdate={updateVolume}
      />
    </div>
  )
}

export default VolumeControl
