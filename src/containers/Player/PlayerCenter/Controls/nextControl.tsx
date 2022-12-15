import React from 'react'
import { ReactComponent as Nexticon } from '../../../../static/icons/next-icon.svg'

const NextControl: React.FC = () => {
  const handleNextSong = () => {
    console.log('Changed to next song!')
  }

  return (
    <button 
      className='text-[color:var(--white)] hover:text-[color:var(--primary-light)] transition'
      onClick={handleNextSong} >
      <Nexticon className='w-5 h-5' />
    </button>
  )
}

export default NextControl
