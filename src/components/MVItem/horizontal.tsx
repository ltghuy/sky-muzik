import { MVProps } from '@models/common'
import { ReactComponent as PlayIcon } from '@static/icons/play-icon.svg'
import { useAudioStore } from '@stores/useAudioStore'
import { useMVStore } from '@stores/useMVStore'
import React from 'react'


const MVHorizontalItem: React.FC<MVProps> = ({ thumbnailM, title, encodeId, artistsNames }) => {
  const { setMVID, setShowMV } = useMVStore()
  const { changePlayIcon } = useAudioStore()

  const playMV = (id: string) => {
    setMVID(id)
    setShowMV(true)
    changePlayIcon(false)
    document.querySelector('audio')?.pause()
  }

  return (
    <div className="mv-item h-full flex items-stretch">
      <div className="mv-left w-28 flex-shrink-0 overflow-hidden group rounded-md cursor-pointer relative">
        <img
          src={thumbnailM}
          alt={title}
          className="absolute w-full h-full object-cover group-hover:scale-110 transition-all"
        />
        <div className="absolute w-full h-full inset-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center">
          <button
            onClick={() => playMV(encodeId)}
            className='text-white'>
            <PlayIcon />
          </button>
        </div>
      </div>
      <div className="mv-right flex-1 font-inter my-auto ml-3">
        <button className="mv-name text-left" onClick={() => playMV(encodeId)}>
          <span className='text-base md:text-xl lg:text-sm leading-4 font-medium text-white hover:text-[color:var(--primary)] cursor-pointer transition one-line' title={title}>
            {title}
          </span>
        </button>
        <div className="mv-artists text-sm md:text-base lg:text-xs font-medium text-[color:var(--black)] opacity-50 one-line">
          {artistsNames}
        </div>
      </div>
    </div>
  )
}

export default MVHorizontalItem
