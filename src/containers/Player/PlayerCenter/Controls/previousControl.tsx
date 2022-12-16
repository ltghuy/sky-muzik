import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../utils/customRedux'
import { setCurrentIndexPlaylist, setSongId, changePlayIcon } from '../../../../redux/features/audioSlice'
import { ReactComponent as PreviousIcon } from '../../../../static/icons/previous-icon.svg'

const PreviousControl: React.FC = () => {
  const currentIndexPlaylist = useAppSelector((state) => state.audio.currentIndexPlaylist)
  const playlistSong: any = useAppSelector((state) => state.audio.playListSong)
  const dispatch = useAppDispatch()

  const handlePreviousSong = () => {
    if (playlistSong !== undefined && playlistSong.length > 0) {
      let currentIndex
      if (currentIndexPlaylist === 0) {
        currentIndex = 0
      } else {
        currentIndex = currentIndexPlaylist - 1
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
      onClick={handlePreviousSong} >
      <PreviousIcon className='w-5 h-5' />
    </button>
  )
}

export default PreviousControl
