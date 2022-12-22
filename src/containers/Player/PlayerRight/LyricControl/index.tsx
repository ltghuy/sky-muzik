import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../utils/customRedux'
import { setOpenLyric } from '../../../../redux/features/audioSlice'
import { ReactComponent as LyricIcon } from '../../../../static/icons/micro-icon.svg'

const LyricControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const isShowLyric = useAppSelector((state) => state.audio.isLyric)
  const songInfo = useAppSelector((state) => state.audio.infoSong)

  const handleShowLyric = () => {
    if (isShowLyric) {
      dispatch(setOpenLyric(false))
    } else {
      dispatch(setOpenLyric(true))
    }
  }

  return (
    <button 
      onClick={handleShowLyric}
      className={`mv-button text-[color:var(--white)] button-hover transition ${!songInfo.hasLyric && 'pointer-events-none opacity-30'}`}
      title='Xem lời bài hát'>
      <LyricIcon className='w-5 h-5' />
    </button>
  )
}

export default LyricControl
