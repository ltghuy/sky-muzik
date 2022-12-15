import React from 'react'
import { ReactComponent as RepeatIcon } from '../../../../static/icons/repeat-icon.svg'

const RepeatControl: React.FC = () => {
  const handleRepeat = () => {
    console.log('List song is repeated!')
  }

  return (
    <button 
      className='text-[color:var(--white)] button-hover transition'
      onClick={handleRepeat} 
      title='Lặp lại bài hát'>
      <RepeatIcon className='w-5 h-5' />
    </button>
  )
}

export default RepeatControl
