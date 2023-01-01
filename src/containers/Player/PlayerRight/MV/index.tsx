import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../utils/customRedux'
import { changePlayIcon } from '../../../../redux/features/audioSlice'
import { ReactComponent as MVIcon } from '../../../../static/icons/video-icon.svg'

const MVControl: React.FC = () => {
  const songInfo = useAppSelector((state) => state.audio.infoSong)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleShowMV = (mvLink: string) => {   
    const mvID = mvLink.substring(mvLink.lastIndexOf("/") + 1, mvLink.lastIndexOf(".html"))
    navigate(`/mv/${mvID}`)
    dispatch(changePlayIcon(false))
    document.querySelector('audio')?.pause()
  }

  return (
    <button 
      className={`mv-button text-[color:var(--white)] button-hover transition ${!songInfo.mvlink && 'pointer-events-none opacity-30'}`}
      title='MV'
      onClick={(e: any) => {songInfo.mvlink ? handleShowMV(songInfo.mvlink) : e.preventDefaul()}}>
      <MVIcon className='w-5 h-5' />
    </button>
  )
}

export default MVControl
