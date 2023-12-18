import Song from '@components/Song'
import { ReactComponent as MusicListIcon } from '@static/icons/music-list.svg'
import { useAudioStore } from '@stores/useAudioStore'
import React, { Fragment, useEffect, useRef, useState } from 'react'

const MusicList: React.FC = () => {
  const [isShowList, setIsShowList] = useState<boolean>(false)
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const { currentIndexPlaylist, playListSong } = useAudioStore()

  const handleShow = () => {
    setIsShowList(isShowList => !isShowList)
  }

  useEffect(() => {
    scrollContainer.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [isShowList])

  return (
    <div className='pl-3 border-l border-l-gray-600 hidden lg:block'>
      <button
        className={`mv-button text-[color:var(--white)] button-hover transition ${isShowList && 'button-shadow'}`}
        onClick={handleShow}
        disabled={playListSong.length === 0}
        title='Danh sách phát'>
        <MusicListIcon className='w-5 h-5' />
      </button>
      {
        playListSong.length > 0 &&
        <div
          className={`side-playlist fixed top-4 right-4 w-80 bottom-[calc(var(--player-height)+1rem)] rounded-xl shadow shadow-white bg-white dark:bg-[color:var(--primary)] p-3 transform duration-1000 ease-in-out ${isShowList ? 'translate-x-0' : 'translate-x-[120%]'} overflow-hidden`}
        >
          <ul className="playlist-wrapper w-full h-full overflow-y-scroll hidden-scrollbar">
            {
              playListSong &&
              playListSong.map((item: any, index: number) => (
                <Fragment key={item.encodeId ?? index}>
                  <li className="side-playlist-item [&:not(:first-child)]:mt-2">
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
                  <div ref={isShowList && playListSong[currentIndexPlaylist]?.encodeId === item?.encodeId ? scrollContainer : undefined}></div>
                </Fragment>
              ))
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default MusicList
