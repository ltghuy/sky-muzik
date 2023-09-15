import React from 'react'
import { useAudioStore } from '@stores/useAudioStore'
import { useMVStore } from '@stores/useMVStore'
import { ReactComponent as MVIcon } from '@static/icons/video-icon.svg'

const MVControl: React.FC = () => {
  const { infoSong, changePlayIcon } = useAudioStore()
  const { setMVID, setShowMV } = useMVStore()

  const handleShowMV = (mvLink: string) => {
    const mvID = mvLink.substring(mvLink.lastIndexOf("/") + 1, mvLink.lastIndexOf(".html"))
    setMVID(mvID)
    setShowMV(true)
    changePlayIcon(false)
    document.querySelector('audio')?.pause()
  }

  return (
    <button
      className={`mv-button text-[color:var(--white)] button-hover transition ${!infoSong.mvlink && 'pointer-events-none opacity-30'}`}
      title='MV'
      onClick={(e: any) => { infoSong.mvlink ? handleShowMV(infoSong.mvlink) : e.preventDefaul() }}>
      <MVIcon className='w-5 h-5' />
    </button>
  )
}

export default MVControl
