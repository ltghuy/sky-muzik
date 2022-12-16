import React from 'react'
import { Link } from 'react-router-dom'
import { SongProps } from '../../types/common'
import { useAppDispatch } from '../../utils/customRedux'
import { formatDuration } from '../../utils/formatTime'
import { changePlayIcon, setCurrentIndexPlaylist, setSongId, setAutoplay } from '../../redux/features/audioSlice'
import { ReactComponent as PlayIcon} from '../../static/icons/play-icon.svg'
import { ReactComponent as VipIcon} from '../../static/icons/vip-icon.svg'

const Song:React.FC<SongProps> = ({ index, thumbnail, title, encodeId, streamingStatus, artists, artistsNames, album, duration }) => {
  const SONG_VIP = 2
  const SONG_NORMAL = 1
  const dispatch = useAppDispatch()
  const songDuration =  duration && formatDuration(duration)

  const handleChangeSong = (encodeId: string, streamingStatus: number, index: number) => {
    if (streamingStatus === SONG_NORMAL) {
      dispatch(changePlayIcon(true))
      dispatch(setCurrentIndexPlaylist(index))
      dispatch(setSongId(encodeId))
      dispatch(setAutoplay(true))
      
      localStorage.setItem('songId', encodeId)
    }
  }

  return (
    <div className="song w-full font-inter h-16 rounded-lg hover:bg-gray-100 my-2 transition">
      <div className={`song-container h-full px-5 flex justify-between items-center group ${streamingStatus === SONG_VIP && 'opacity-40'}`}>
        <div className="song-info w-1/2 flex-shrink-0 pr-5 flex items-center">
          <div className={`song-thumbnail w-10 h-10 relative ${streamingStatus === SONG_VIP && 'pointer-events-none'}`} 
            onClick={() => handleChangeSong(encodeId, streamingStatus, index)}>
            <img src={thumbnail} alt={title} className='rounded-md' />
            <div className='absolute w-full h-full inset-0 hidden group-hover:flex justify-center items-center bg-black bg-opacity-30 text-white cursor-pointer'>
              <PlayIcon />
            </div>
          </div>
          <div className='song-desc ml-2 flex flex-col text-[color:var(--black)]'>
            <h3 className='song-name text-sm leading-4 font-medium flex items-center' title={title}>
              <span className='one-line '>{title}</span>
              { streamingStatus === SONG_VIP && <span className='ml-1'><VipIcon /></span> }
            </h3>
            <div className='song-artist font-medium'>
              {
                artists ? 
                artists.map((item: any, index: number) => (
                  <span key={index} className='group'>
                    { (index > 0) ? (<span className='opacity-50'>, </span>) : ("") }
                    <Link
                      className='text-xs hover:text-[color:var(--primary)] opacity-50 group-hover:opacity-100'
                      to={`/artist/${item.alias}`}
                    >
                      <span title={item.name}>{item.name}</span>
                    </Link>
                  </span>
                )) : 
                <span className='text-xs hover:text-[color:var(--primary)] opacity-50 group-hover:opacity-100'>
                  <span title={artistsNames}>{ artistsNames }</span>
                </span>
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
