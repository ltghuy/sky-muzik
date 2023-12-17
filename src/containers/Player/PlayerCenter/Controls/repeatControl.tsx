import React from 'react'
import { useAudioStore } from '@stores/useAudioStore'
import { ReactComponent as RepeatIcon } from '@static/icons/repeat-icon.svg'

const RepeatControl: React.FC = () => {
  const { isLoop, setLoop } = useAudioStore()

  const handleRepeat = () => {
    if (isLoop) setLoop(false)
    else setLoop(true)
  }

  return (
    <button
      className={`${isLoop ? 'text-[color:var(--primary-light)]' : 'text-[color:var(--white)]'} button-hover transition`}
      onClick={handleRepeat}
      title='Lặp lại bài hát'>
      <RepeatIcon className='media-control-btn' />
    </button>
  )
}

export default RepeatControl
