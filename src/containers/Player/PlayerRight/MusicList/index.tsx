import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../../../../utils/customRedux'
import { ReactComponent as MusicListIcon } from '../../../../static/icons/music-list.svg'
import Song from '../../../../components/Song.tsx'

const MusicList: React.FC = () => {
  const [isShowList, setIsShowList] = useState<boolean>(false)
  const currentIndex = useAppSelector((state) => state.audio.currentIndexPlaylist)
  const playlistSong: object[] = useAppSelector((state) => state.audio.playListSong)

  const handleShow = () => {
    setIsShowList(isShowList => !isShowList)
  }

  useEffect(() => {
    if (document && isShowList) {
      const currentPlaylistItem = document.querySelector(`#side-playlist-item-${currentIndex}`) as HTMLLIElement
      currentPlaylistItem.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isShowList])

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
          className={`side-playlist fixed top-4 right-4 w-80 bottom-[calc(var(--player-height)+1rem)] rounded-3xl shadow shadow-white bg-white dark:bg-[color:var(--primary)] px-2 py-4 transform duration-1000 ease-in-out ${isShowList ? 'translate-x-0' : 'translate-x-[120%]'} overflow-hidden`} 
          >
          <ul className="playlist-wrapper w-full h-full overflow-y-scroll hidden-scrollbar">
            {
              playlistSong && 
              playlistSong.map((item: any, index: number) => (
                <li className="side-playlist-item" id={`side-playlist-item-${index}`} key={index}>
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
                    isShortened
                  />
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default MusicList
