import React from 'react'
import { useAudioStore } from '@stores/useAudioStore'
import { ReactComponent as Nexticon } from '@static/icons/next-icon.svg'

const NextControl: React.FC = () => {
  const {
    currentIndexPlaylist,
    playListSong,
    changePlayIcon,
    setCurrentIndexPlaylist,
    setSongId,
    setAutoplay
  } = useAudioStore()

  const handleNextSong = () => {
    if (playListSong !== undefined && playListSong.length > 0) {
      let currentIndex
      if (currentIndexPlaylist === playListSong.length - 1) {
        currentIndex = 0
      } else {
        currentIndex = currentIndexPlaylist + 1
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
      onClick={handleNextSong} >
      <Nexticon className='w-5 h-5' />
    </button>
  )
}

export default NextControl
