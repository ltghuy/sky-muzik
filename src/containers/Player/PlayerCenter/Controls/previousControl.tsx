import React from 'react'
import { useAudioStore } from '../../../../store/useAudioStore'
import { ReactComponent as PreviousIcon } from '../../../../static/icons/previous-icon.svg'

const PreviousControl: React.FC = () => {
  const {
    currentIndexPlaylist, 
    playListSong,
    setCurrentIndexPlaylist,
    setSongId,
    setAutoplay,
    changePlayIcon
  } = useAudioStore()

  const handlePreviousSong = () => {
    if (playListSong !== undefined && playListSong.length > 0) {
      let currentIndex
      if (currentIndexPlaylist === 0) {
        currentIndex = 0
      } else {
        currentIndex = currentIndexPlaylist - 1
      }

      setCurrentIndexPlaylist(currentIndex)
      setSongId(playListSong[currentIndex].encodeId)
      changePlayIcon(true)
      setAutoplay(true)
      localStorage.setItem('songId', playListSong[currentIndex].encodeId)
    }
  }

  return (
    <button 
      className='text-[color:var(--white)] button-hover transition'
      onClick={handlePreviousSong} >
      <PreviousIcon className='w-5 h-5' />
    </button>
  )
}

export default PreviousControl
