import React from 'react'
import { Link } from 'react-router-dom'
import { useAudioStore } from '@stores/useAudioStore'
import { ReactComponent as HeartIcon } from '@static/icons/heart-icon.svg'
import { ReactComponent as DotstIcon } from '@static/icons/triple-dots.svg'

const PlayerLeft: React.FC = () => {
  const { infoSong, currentAlbum } = useAudioStore()

  return (
    <section className='player-left w-[20%] lg:w-[30%] flex items-center justify-start flex-shrink-0 basis-auto'>
      <div className="media-thumnail">
        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
          <Link to={`/playlist/${currentAlbum}`} className='block w-full h-full'>
            <img
              className='object-cover'
              src={infoSong.thumbnail}
              alt={infoSong.title} />
          </Link>
        </div>
      </div>
      <div className="media-info ml-3 font-inter">
        <div className='media-name text-[color:var(--white)] text-sm font-medium one-line' title={infoSong.title}>
          <Link to={`/playlist/${currentAlbum}`}>{infoSong.title}</Link>
        </div>
        <div className='media-artist flex one-line'>
          {
            infoSong.artists.map((artist: any, index: number) => (
              <Link
                key={index}
                to={`/artist/${artist.alias}`}
                className='text-[color:var(--grey-100)] text-xs leading-5 font-medium'>
                <span>{index > 0 ? ', ' : ''}</span>
                <span className='hover:text-[color:var(--primary-light)] hover:underline' title={artist.name}>
                  {artist.name}
                </span>
              </Link>
            ))
          }
        </div>
      </div>
      <div className="media-controls ml-5 hidden lg:block">
        <button className='text-[color:var(--white)] button-hover transition'>
          <HeartIcon />
        </button>
        <button className='text-[color:var(--white)] ml-1 button-hover transition'>
          <DotstIcon />
        </button>
      </div>
    </section>
  )
}

export default PlayerLeft
