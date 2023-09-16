import React from 'react'
import { useAudioStore } from '@stores/useAudioStore'
import { ReactComponent as NextIcon } from '@static/icons/next-icon.svg'
import { LOCAL_STORAGE_KEYS } from '@constants/localStorageKeys'

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
      localStorage.setItem(LOCAL_STORAGE_KEYS.SONG_ID, playListSong[currentIndex].encodeId)
    }
  }

  return (
    <button
      className='text-[color:var(--white)] button-hover transition'
      onClick={handleNextSong} >
      <NextIcon className='w-5 h-5' />
    </button>
  )
}

export default NextControl
