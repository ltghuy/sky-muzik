import React from 'react'
import { PlaylistDetailProps } from '../../types/common'
import Song from '../Song.tsx'

const PlaylistTrack: React.FC<PlaylistDetailProps> = ({ description, song }) => {
  const totalDuration =  song?.totalDuration && (new Date(song?.totalDuration * 1000).toISOString().slice(11, 19))
  return (
    <div className='playlist-track font-inter'>
      <div className="playlist-title text-sm text-[color:var(--black)] font-medium">
        <span className='opacity-50'>Lời tựa: </span><br/>
        <span>{description}</span>
      </div>
      <h6 className="playlist-count flex items-center pl-5 mt-2 text-[color:var(--primary)] text-base">
        <span className="total-song">{`${song?.items.length} bài hát`}</span>
        <span className='px-2'>&bull;</span>
        <span className="total-time">{totalDuration}</span>
      </h6>
      <ul className="playlist-list mt-5">
        {
         song && song.items.map((item: any, index: number) => (
          <li className="playlist-item" key={index}>
            <Song 
              thumbnail={item?.thumbnail}
              title={item?.title}
              encodeId={item?.encodeId}
              duration={item?.duration}
              streamingStatus={item?.streamingStatus}
              artists={item?.artists}
              artistsNames={item?.artistsNames}
              album={item?.album}
            />
          </li>
         )) 
        }
      </ul>
    </div>
  )
}

export default PlaylistTrack
