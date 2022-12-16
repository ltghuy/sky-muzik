import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../utils/customRedux'
import { setLoop } from '../../../../redux/features/audioSlice'
import { ReactComponent as RepeatIcon } from '../../../../static/icons/repeat-icon.svg'

const RepeatControl: React.FC = () => {
  const isLoop = useAppSelector((state) => state.audio.isLoop)
  const dispatch = useAppDispatch()

  const handleRepeat = () => {
    if (isLoop) dispatch(setLoop(false))
    else dispatch(setLoop(true))
  }

  return (
    <button 
      className={`${isLoop ? 'text-[color:var(--primary-light)]' : 'text-[color:var(--white)]'} button-hover transition`}
      onClick={handleRepeat} 
      title='Lặp lại bài hát'>
      <RepeatIcon className='w-5 h-5' />
    </button>
  )
}

export default RepeatControl
