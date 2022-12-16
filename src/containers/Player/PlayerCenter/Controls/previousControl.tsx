import React from 'react'
import { ReactComponent as PreviousIcon } from '../../../../static/icons/previous-icon.svg'

const PreviousControl: React.FC = () => {

  const handlePreviousSong = () => {
    console.log('Go to prev song...')
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
