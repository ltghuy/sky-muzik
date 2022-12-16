import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../utils/customRedux'
import { setShuffle } from '../../../../redux/features/audioSlice'
import { ReactComponent as ShuffleIcon } from '../../../../static/icons/shuffle-icon.svg'

const ShuffleControl: React.FC = () => {
  const isShuffle = useAppSelector((state) => state.audio.isShuffle)
  const dispatch = useAppDispatch()

  const handleShuffleSong = () => {
    if (isShuffle) dispatch(setShuffle(false))
    else dispatch(setShuffle(true))
  }

  return (
    <button 
    className={`${isShuffle ? 'text-[color:var(--primary-light)]' : 'text-[color:var(--white)]'} button-hover transition`}
      onClick={handleShuffleSong}
      title='Phát bài hát ngẫu nhiên' >
      <ShuffleIcon className='w-5 h-5' />
    </button>
  )
}

export default ShuffleControl
