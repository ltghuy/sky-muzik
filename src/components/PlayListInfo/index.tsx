import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/customRedux'
import { changePlayIcon } from '../../redux/features/audioSlice'
import { PlaylistDetailProps } from '../../types/common'
import { ReactComponent as PlayIcon } from '../../static/icons/play-icon.svg'
import { ReactComponent as LikedIcon } from '../../static/icons/heart-icon.svg'
import Button from '../Button'

const PlayListInfo: React.FC<PlaylistDetailProps> = ({ thumbnailM, title, contentLastUpdate, artists, like, isCurrentPlaylist }) => {
  const isPlay = useAppSelector((state) => state.audio.isPlay)
  const dispatch = useAppDispatch()
  const playlistLastUpdate =  contentLastUpdate && (new Date(contentLastUpdate * 1000)).toLocaleDateString("vi-VN")

  const onPlaylistPlay = () => {
    const audio = document.querySelector('audio')
    if (isPlay) {
      dispatch(changePlayIcon(false))
      audio?.pause()
    } else {
      dispatch(changePlayIcon(true))
      audio?.play()
    }
  }

  return (
    <div className='playlist-info px-5'>
      <div className="playlist-thumbnail w-[65%] relative mx-auto">
        <img 
        src={thumbnailM} 
        alt={title} 
        className={`w-full object-cover ${isCurrentPlaylist && isPlay ? 'rounded-full animate-rotate' : 'rounded-2xl'}`} />
        <div className="absolute w-full h-full inset-0 flex justify-center items-center">
          <button className='text-white p-3 border border-white rounded-full'>
            <PlayIcon />
          </button>
        </div>
      </div>
      <div className="playlist-description font-inter mt-5 flex flex-col items-center text-[color:var(--black)] text-center">
        <h4 className="playlist-title font-bold text-xl">
          {title}
        </h4>
        <p className='playlist-updated text-sm max-w-[70%] font-semibold pt-2'>
          {`Cập nhật lần cuối: ${playlistLastUpdate}`}
        </p>
        <div className="artist-list flex one-line">
          {
            artists && artists.map((artist: any, index: number) => (
              <span key={artist.id}>
                { (index > 0) ? (<span>, </span>) : ("") }
                <Link 
                  to={`artist/${artist.alias}`}
                  className="hover:text-[color:var(--primary)] text-sm"
                >
                  <span title={artist.name}>{artist.name}</span>
                </Link>
              </span>
            ))
          }
        </div>
        <p className='playlist-liked flex items-center text-sm pt-2'>
          <span className='text-[color:var(--primary)]'><LikedIcon /></span>
          <span className='ml-1'>{ like }</span>
        </p>
      </div>
      <div className="playlist-button flex justify-center my-5">
        <Button 
          classStyle='w-[175px] flex justify-center uppercase'  
          text={isPlay ? 'Tạm dừng' : 'Tiếp tục phát'}
          handleClick={onPlaylistPlay}
        />
      </div>
    </div>
  )
}

export default PlayListInfo
