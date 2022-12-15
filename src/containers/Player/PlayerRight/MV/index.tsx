import React from 'react'
import { ReactComponent as MVIcon } from '../../../../static/icons/video-icon.svg'

const MVControl: React.FC = () => {
  return (
    <button 
      className='mv-button text-[color:var(--white)] button-hover transition'
      title='MV'>
      <MVIcon className='w-5 h-5' />
    </button>
  )
}

export default MVControl
