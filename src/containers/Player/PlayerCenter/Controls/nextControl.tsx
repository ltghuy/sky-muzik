import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../utils/customRedux'
import { ReactComponent as Nexticon } from '../../../../static/icons/next-icon.svg'
import { changePlayIcon, setCurrentIndexPlaylist, setSongId } from '../../../../redux/features/audioSlice'

const NextControl: React.FC = () => {
  const currentIndexPlaylist = useAppSelector((state) => state.audio.currentIndexPlaylist)
  const playlistSong: any = useAppSelector((state) => state.audio.playListSong)
  const dispatch = useAppDispatch()
  
  const handleNextSong = () => {
    if (playlistSong !== undefined && playlistSong.length > 0) {
      let currentIndex
      if (currentIndexPlaylist === playlistSong.length - 1) {
        currentIndex = 0
      } else {
        currentIndex = currentIndexPlaylist + 1
      }

      dispatch(setCurrentIndexPlaylist(currentIndex))
      dispatch(setSongId(playlistSong[currentIndex].encodeId))
      dispatch(changePlayIcon(true))
      localStorage.setItem('songId', playlistSong[currentIndex].encodeId)
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
