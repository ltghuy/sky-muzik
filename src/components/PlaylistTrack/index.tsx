import React, { useEffect } from 'react'
import { useAppSelector } from '../../utils/customRedux'
import { PlaylistDetailProps } from '../../types/common'
import Song from '../Song.tsx'

const PlaylistTrack: React.FC<PlaylistDetailProps> = ({ description, song, isCurrentPlaylist }) => {
  const currentIndex = useAppSelector((state) => state.audio.currentIndexPlaylist)
  const totalDuration =  song?.totalDuration && (new Date(song?.totalDuration * 1000).toISOString().slice(11, 19))

  useEffect(() => {
    if (isCurrentPlaylist && document) {
      const currentSongItem = document.querySelector(`#playlist-item-${currentIndex}`) as HTMLLIElement
      currentSongItem.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [currentIndex])

  return (
    <div className='playlist-track font-inter'>
      <div className="playlist-title text-sm text-black dark:text-white font-medium">
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
          <li className="playlist-item" id={`playlist-item-${index}`} key={index}>
            <Song 
              index={index}
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
