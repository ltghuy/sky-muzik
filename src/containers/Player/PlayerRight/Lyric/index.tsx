import React from 'react'
import { ReactComponent as LyricIcon } from '../../../../static/icons/micro-icon.svg'

const LyricControl: React.FC = () => {
  return (
    <button 
      className='mv-button text-[color:var(--white)] button-hover transition'
      title='Xem lời bài hát'>
      <LyricIcon className='w-5 h-5' />
    </button>
  )
}

export default LyricControl
