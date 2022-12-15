import React from 'react'
import { ReactComponent as ShuffleIcon } from '../../../../static/icons/shuffle-icon.svg'

const ShuffleControl: React.FC = () => {
  const handleShuffleSong = () => {
    console.log('List song is shuffled!')
  }

  return (
    <button 
      className='text-[color:var(--white)] hover:text-[color:var(--primary-light)] transition'
      onClick={handleShuffleSong} >
      <ShuffleIcon className='w-5 h-5' />
    </button>
  )
}

export default ShuffleControl
