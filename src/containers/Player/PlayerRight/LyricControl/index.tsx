import React from 'react'
import { useAudioStore } from '../../../../store/useAudioStore'
import { ReactComponent as LyricIcon } from '../../../../static/icons/micro-icon.svg'

const LyricControl: React.FC = () => {
  const { isLyric, infoSong, setOpenLyric } = useAudioStore()

  const handleShowLyric = () => {
    if (isLyric) {
      setOpenLyric(false)
    } else {
      setOpenLyric(true)
    }
  }

  return (
    <button 
      onClick={handleShowLyric}
      className={`mv-button text-[color:var(--white)] button-hover transition ${!infoSong.hasLyric && 'pointer-events-none opacity-30'}`}
      title='Xem lời bài hát'>
      <LyricIcon className='w-5 h-5' />
    </button>
  )
}

export default LyricControl
