import { LOCAL_STORAGE_KEYS } from '@constants/localStorageKeys'
import { SongProps } from '@models/common'
import { ReactComponent as PlayIcon } from '@static/icons/play-icon.svg'
import { ReactComponent as VipIcon } from '@static/icons/vip-icon.svg'
import { useAudioStore } from '@stores/useAudioStore'
import { formatDuration } from '@utils/formatTime'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

interface SongInterface extends SongProps {
  isShortened?: boolean,
  handleClick?: Function
}

const Song: React.FC<SongInterface> = ({ index, thumbnail, title, encodeId, streamingStatus, artists, artistsNames, album, duration, isShortened, handleClick }) => {
  const SONG_VIP = 2
  const SONG_NORMAL = 1
  const {
    currentIndexPlaylist,
    songID,
    currentAlbum,
    changePlayIcon,
    setCurrentIndexPlaylist,
    setCurrentAlbum,
    setSongId,
    setAutoplay } = useAudioStore()
  const params = useParams<{ playlistID: string }>()
  const songDuration = duration && formatDuration(duration)

  const handleChangeSong = (encodeId: string, streamingStatus: number, index: number) => {
    setAutoplay(true)
    changePlayIcon(true)

    if (handleClick) {
      handleClick()
      return
    }

    if (streamingStatus === SONG_NORMAL && (params.playlistID || currentAlbum)) {
      setCurrentIndexPlaylist(index)
      setCurrentAlbum(params.playlistID || currentAlbum)
      setSongId(encodeId)

      localStorage.setItem(LOCAL_STORAGE_KEYS.SONG_ID, encodeId)
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_ALBUM, params.playlistID || currentAlbum)
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_INDEX, index.toString())
    }
  }

  return (
    <div className={`song w-full font-inter rounded-lg my-2 transition ${currentIndexPlaylist === index && songID === encodeId ? 'bg-[color:var(--primary-lighter)] dark:bg-[color:var(--primary-light)]' : 'hover:bg-gray-100 dark:hover:bg-gray-400'}`}>
      <div className={`song-container p-3 md:p-5 flex justify-between items-center group ${streamingStatus === SONG_VIP && 'opacity-40'}`}>
        <div className={`song-info flex-1 md:flex-0 pr-5 flex items-center ${isShortened ? 'w-full' : 'w-1/2'}`}>
          <div className={`song-thumbnail w-10 h-10 flex-shrink-0 relative ${streamingStatus === SONG_VIP && 'pointer-events-none'}`}
            onClick={() => handleChangeSong(encodeId, streamingStatus, index)}>
            <img src={thumbnail} alt={title} className='rounded-md' />
            <div className='absolute w-full h-full inset-0 hidden group-hover:flex justify-center items-center bg-black bg-opacity-30 text-white cursor-pointer'>
              <PlayIcon />
            </div>
          </div>
          <div className='song-desc ml-2 flex flex-col text-black dark:text-white'>
            <h3 className='song-name text-sm leading-4 font-medium flex items-center break-all' title={title}>
              <span className='one-line '>{title}</span>
              {streamingStatus === SONG_VIP && <span className='ml-1'><VipIcon /></span>}
            </h3>
            <div className='song-artist font-medium one-line'>
              {
                artists ?
                  artists.map((item: any, index: number) => (
                    <span key={index} className='group'>
                      {(index > 0) ? (<span className='opacity-50'>, </span>) : ("")}
                      <Link
                        className='text-xs hover:text-[color:var(--primary-darker)] opacity-50 group-hover:opacity-100'
                        to={`/artist/${item.alias}`}
                      >
                        <span title={item.name}>{item.name}</span>
                      </Link>
                    </span>
                  )) :
                  <span className='text-xs hover:text-[color:var(--primary-darker)] opacity-50 group-hover:opacity-100'>
                    <span title={artistsNames}>{artistsNames}</span>
                  </span>
              }
            </div>
          </div>
        </div>
        <div className={`song-album hidden md:block flex-1 basis-auto ${isShortened && 'hidden'}`}>
          {
            album !== undefined ? (
              <Link
                to={`/playlist/${album.encodeId}`}
                className='text-xs font-medium dark:text-white hover:text-[color:var(--primary)] hover:underline transition'>
                <span className='one-line' title={album.title}>{album.title}</span>
              </Link>
            ) : ''
          }
        </div>
        <div className={`song-duration flex-shrink-0 basis-auto ml-2 ${isShortened && 'hidden'}`}>
          <span className='text-xs font-medium dark:text-white'>{songDuration}</span>
        </div>
      </div>
    </div>
  )
}

export default Song
