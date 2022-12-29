import React from 'react'
import { MVProps } from '../../types/common'
import { useAppDispatch } from '../../utils/customRedux'
import { useNavigate, Link } from 'react-router-dom'
import { changePlayIcon } from '../../redux/features/audioSlice'
import { ReactComponent as PlayIcon } from '../../static/icons/play-icon.svg'

const MVItem:React.FC<MVProps> = ({ thumbnailM, title, encodeId, artist, artistsNames}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const playMV = (id: string) => {
    navigate(`/mv/${id}`)
    dispatch(changePlayIcon(false))
    document.querySelector('audio')?.pause()
  }

  return (
    <div className="mv-item h-72 flex flex-col" key={encodeId}>
      <div className="mv-top w-full flex-1 overflow-hidden group rounded-2xl cursor-pointer relative">
        <img 
          src={thumbnailM} 
          alt={title} 
          className="absolute w-full h-full object-cover group-hover:scale-110 transition-all" 
        />
        <div className="absolute w-full h-full inset-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center">
          <button 
            onClick={() => playMV(encodeId)}
            className='text-white p-3 border border-white rounded-full'>
            <PlayIcon />
          </button>
        </div>
      </div>
      <div className="mv-bottom h-14 flex-shrink-0 flex items-center">
        <div className="artist-avatar w-10 h-10">
          <Link to={artist?.alias ? `/artist/${artist.alias}` : '#'}>
            <img 
              className='w-full h-full object-cover rounded-full'
              src={artist?.thumbnail} 
              alt={artist?.name} />
          </Link>
        </div>
        <div className="mv-description font-inter ml-2">
          <button className="mv-name" onClick={() => playMV(encodeId)}>
            <span className='text-sm leading-4 font-medium text-[color:var(--black)] hover:text-[color:var(--primary)] cursor-pointer transition one-line' title={title}>
              {title}
            </span>
          </button>
          <div className="mv-artists text-xs font-medium text-[color:var(--black)] opacity-50">
            {artistsNames}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MVItem
