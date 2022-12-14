import React from 'react'
import { Link } from 'react-router-dom'
import { SongProps } from '../../types/common'
import { ReactComponent as PlayIcon} from '../../static/icons/play-icon.svg'

const Song:React.FC<SongProps> = ({ thumbnail, title, encodeId, streamingStatus, artists, album, duration }) => {
  const SONG_VIP = 2
  const songDuration =  duration && (new Date(duration * 1000).toISOString().slice(14, 19))
  const handleChangeSong = (encodeId: string) => {
    console.log('Change to song with encode: ', encodeId)
  }

  return (
    <div className="song w-full font-inter h-16 rounded-lg hover:bg-gray-100 my-2 transition">
      <div className={`song-container h-full px-5 flex justify-between items-center group ${streamingStatus === SONG_VIP && 'opacity-40'}`}>
        <div className="song-info w-1/2 flex-shrink-0 mr-2 flex items-center">
          <div className={`song-thumbnail w-10 h-10 relative ${streamingStatus === SONG_VIP && 'pointer-events-none'}`} 
            onClick={() => handleChangeSong(encodeId)}>
            <img src={thumbnail} alt={title} className='rounded-md' />
            <div className='absolute w-full h-full inset-0 hidden group-hover:flex justify-center items-center bg-black bg-opacity-30 text-white cursor-pointer'>
              <PlayIcon />
            </div>
          </div>
          <div className='song-desc ml-2 flex flex-col text-[color:var(--black)]'>
            <h3 className='song-name text-sm leading-4 font-medium'>{title}</h3>
            <div className='song-artist font-medium'>
              {
                artists.map((item: any, index: number) => (
                  <span key={index} className='group'>
                    { (index > 0) ? (<span className='opacity-50'>, </span>) : ("") }
                    <Link
                      className='text-xs hover:text-[color:var(--primary)] opacity-50 group-hover:opacity-100'
                      to={`/artist/${item.alias}`}
                    >
                      {item.name}
                    </Link>
                  </span>
                ))
              }
            </div>
          </div>
        </div>
        <div className="song-album flex-1 basis-auto">
          { 
            album !== undefined ? (
              <Link 
              to={`/playlist/${album.encodeId}`}
              className='text-xs font-medium hover:text-[color:var(--primary)] hover:underline transition'>
                <span className='one-line' title={album.title}>{album.title}</span>
              </Link>
            ) : ''
          }
        </div>
        <div className="song-duration flex-shrink-0 basis-auto ml-2">
          <span className='text-xs font-medium'>{songDuration}</span>
        </div>
      </div>
    </div>
  )
}

export default Song
