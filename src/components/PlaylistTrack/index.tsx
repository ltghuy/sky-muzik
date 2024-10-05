import Song from '@components/Song';
import { PlaylistDetailProps } from '@models/common';
import { useAudioStore } from '@stores/useAudioStore';
import React, { Fragment, useEffect, useRef } from 'react';

const PlaylistTrack: React.FC<PlaylistDetailProps> = ({ description, song, isCurrentPlaylist }) => {
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const totalDuration = song?.totalDuration && (new Date(song?.totalDuration * 1000).toISOString().slice(11, 19))
  const { currentIndexPlaylist, playListSong } = useAudioStore()

  useEffect(() => {
    scrollContainer.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [isCurrentPlaylist])

  return (
    <div className='playlist-track font-inter'>
      <div className="playlist-title text-sm text-black dark:text-white font-medium max-lg:text-center">
        <span className='opacity-50'>Lời tựa: </span><br />
        <span>{description}</span>
      </div>
      <h6 className="playlist-count flex items-center justify-center lg:justify-start lg:pl-5 mt-2 text-[color:var(--primary)] text-base">
        <span className="total-song">{`${song?.items.length} bài hát`}</span>
        <span className='px-2'>&bull;</span>
        <span className="total-time">{totalDuration}</span>
      </h6>
      <ul className="playlist-list mt-5">
        {
          song?.items.map((item: any, index: number) => (
            <Fragment key={item.encodeId ?? index}>
              <li className="playlist-item [&:not(:first-child)]:mt-2">
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
                <div ref={isCurrentPlaylist && playListSong[currentIndexPlaylist]?.encodeId === item?.encodeId ? scrollContainer : undefined}></div>
              </li>
            </Fragment>
          ))
        }
      </ul>
    </div>
  )
}

export default PlaylistTrack
