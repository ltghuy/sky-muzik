import React, { useContext } from 'react'
import { AudioContext } from '@containers/Player'
import { useAudioStore } from '@stores/useAudioStore'
import { ReactComponent as PlayIcon } from '@static/icons/play-solid.svg'
import { ReactComponent as PauseIcon } from '@static/icons/pause-solid.svg'

const PlayControl: React.FC = () => {
  const audioRef = useContext(AudioContext)
  const { isPlay, changePlayIcon } = useAudioStore()

  const handlePlaySong = () => {
    if (isPlay) {
      changePlayIcon(false)
      if (audioRef) {
        audioRef.pause()
      }
    } else {
      changePlayIcon(true)
      if (audioRef) {
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
