import React, { useState } from 'react'
import { useAppSelector } from '../../../../utils/customRedux'
import { ReactComponent as MusicListIcon } from '../../../../static/icons/music-list.svg'
import Song from '../../../../components/Song.tsx'

const MusicList: React.FC = () => {
  const [isShowList, setIsShowList] = useState<boolean>(false)
  const playlistSong: object[] = useAppSelector((state) => state.audio.playListSong)

  const handleShow = () => {
    setIsShowList(isShowList => !isShowList)
  }

  return (
    <div className='pl-3 border-l border-l-gray-600'>
      <button
        className={`mv-button text-[color:var(--white)] button-hover transition ${isShowList && 'button-shadow'}`}
        onClick={handleShow}
        disabled={playlistSong.length === 0}
        title='Danh sách phát'>
          <MusicListIcon className='w-5 h-5' />
      </button>
      {
        playlistSong.length > 0 &&
        <div 
          className={`side-playlist fixed top-4 right-4 w-80 bottom-[calc(var(--player-height)+1rem)] rounded-3xl shadow shadow-white bg-white dark:bg-[color:var(--primary)] px-2 pt-5 transform duration-1000 ease-in-out ${isShowList ? 'translate-x-0' : 'translate-x-[120%]'} overflow-hidden`} 
          >
          <div className="playlist-wrapper w-full h-full overflow-y-scroll hidden-scrollbar">
            {
              playlistSong && playlistSong.filter((song: any) => song.streamingStatus === 1)
              .map((item: any, index: number) => (
                <Song 
                  key={index}
                  index={index}
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  encodeId={item?.encodeId}
                  duration={item?.duration}
                  streamingStatus={item?.streamingStatus}
                  artists={item?.artists}
                  artistsNames={item?.artistsNames}
                  album={item?.album}
                  isShortened
                />
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default MusicList
