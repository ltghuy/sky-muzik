import React from 'react'
import { Link } from 'react-router-dom'
import { PlaylistDetailProps } from '../../types/common'
import { ReactComponent as PlayIcon } from '../../static/icons/play-icon.svg'
import { ReactComponent as LikedIcon } from '../../static/icons/heart-icon.svg'
import Button from '../Button'

const PlayListInfo: React.FC<PlaylistDetailProps> = ({ thumbnailM, title, contentLastUpdate, artists, like }) => {
  const playlistLastUpdate =  (new Date(contentLastUpdate * 1000)).toLocaleDateString("vi-VN")

  const onPlaylistPlay = () => {
    console.log('Button clicked!')
  }

  return (
    <section className='playlist-info'>
      <div className="playlist-thumbnail w-[60%] relative animate-rotate mx-auto">
        <img src={thumbnailM} alt="aaa" className='w-full object-cover rounded-full'/>
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
        <div className="artist-list flex">
          {
            artists && artists.map((artist: any, index: number) => (
              <span key={artist.id}>
                { (index > 0) ? (<span>, </span>) : ("") }
                <Link 
                  to={`artist/${artist.alias}`}
                  className="hover:text-[color:var(--primary)] text-sm"
                >
                  {artist.name}
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
          text='Tiếp tục phát'
          handleClick={onPlaylistPlay}
        />
      </div>
    </section>
  )
}

export default PlayListInfo
