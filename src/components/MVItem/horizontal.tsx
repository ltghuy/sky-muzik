import React from 'react'
import { MVProps } from '../../types/common'
import { useAppDispatch } from '../../utils/customRedux'
import { setMVID, setShowMV } from '../../redux/features/mvSlice'
import { changePlayIcon } from '../../redux/features/audioSlice'
import { ReactComponent as PlayIcon } from '../../static/icons/play-icon.svg'


const MVHorizontalItem:React.FC<MVProps> = ({ thumbnailM, title, encodeId, artist, artistsNames}) => {
  const dispatch = useAppDispatch()

  const playMV = (id: string) => {
    dispatch(setMVID(id))
    dispatch(setShowMV(true))
    dispatch(changePlayIcon(false))
    document.querySelector('audio')?.pause()
  }

  return (
    <div className="mv-item h-full flex items-stretch">
      <div className="mv-left flex-1 overflow-hidden group rounded cursor-pointer relative">
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
          <span className='text-sm leading-4 font-medium text-white hover:text-[color:var(--primary)] cursor-pointer transition one-line' title={title}>
            {title}
          </span>
        </button>
        <div className="mv-artists text-xs font-medium text-[color:var(--black)] opacity-50 one-line">
          {artistsNames}
        </div>
      </div>
    </div>
  )
}

export default MVHorizontalItem
