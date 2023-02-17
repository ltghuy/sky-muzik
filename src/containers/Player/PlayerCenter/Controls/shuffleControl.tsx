import React from 'react'
import { useAudioStore } from '../../../../store/useAudioStore'
import { ReactComponent as ShuffleIcon } from '../../../../static/icons/shuffle-icon.svg'

const ShuffleControl: React.FC = () => {
  const { isShuffle, setShuffle } = useAudioStore()

  const handleShuffleSong = () => {
    if (isShuffle) setShuffle(false)
    else setShuffle(true)
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
