import React, { useEffect, useMemo } from 'react'
import Button from '@components/Button'
import { Link, useParams } from 'react-router-dom'
import { useAudioStore } from '@stores/useAudioStore'
import { useDetailPlaylist } from '@hooks/detail-playlist'
import { PlaylistDetailProps } from '@models/common'
import { ReactComponent as PlayIcon } from '@static/icons/play-icon.svg'
import { ReactComponent as LikedIcon } from '@static/icons/heart-icon.svg'
import { LOCAL_STORAGE_KEYS } from '@constants/localStorageKeys'

const PlayListInfo: React.FC<PlaylistDetailProps> = ({ thumbnailM, title, contentLastUpdate, artists, like, isCurrentPlaylist }) => {
  const { isPlay, currentAlbum, playListSong, changePlayIcon, setCurrentIndexPlaylist, setSongId, setCurrentAlbum, setAutoplay, setPlaylistSong } = useAudioStore()
  const params = useParams<{ playlistID: string }>()
  const { data } = useDetailPlaylist(params.playlistID ?? currentAlbum)
  const playlistLastUpdate = contentLastUpdate && (new Date(contentLastUpdate * 1000)).toLocaleDateString("vi-VN")

  const isCurrentAlbum = useMemo(() => {
    return currentAlbum === params.playlistID
  }, [params])

  useEffect(() => {
    setPlaylistSong(data?.song ?? playListSong)
  }, [])

  const onPlaylistPlay = () => {
    const audio = document.querySelector('audio')
    if (!isCurrentAlbum) {
      setCurrentIndexPlaylist(0)
      setCurrentAlbum(params.playlistID ?? currentAlbum)
      setSongId(playListSong.items[0]?.encodeId ?? '')
      setAutoplay(true)
      changePlayIcon(true)

      localStorage.setItem(LOCAL_STORAGE_KEYS.SONG_ID, playListSong.items[0]?.encodeId ?? '')
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_ALBUM, params.playlistID ?? currentAlbum)
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_INDEX, '0')
    } else {
      if (isPlay) {
        changePlayIcon(false)
        audio?.pause()
      } else {
        changePlayIcon(true)
        audio?.play()
      }
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
          <button className='text-white p-3 border border-white rounded-full' onClick={onPlaylistPlay}>
            <PlayIcon />
          </button>
        </div>
      </div>
      <div className="playlist-description font-inter mt-5 flex flex-col items-center text-black dark:text-white text-center">
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
                {(index > 0) ? (<span>, </span>) : ("")}
                <Link
                  to={`/artist/${artist.alias}`}
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
          <span className='ml-1'>{like}</span>
        </p>
      </div>
      <div className="playlist-button flex justify-center my-5">
        {
          isCurrentAlbum ? <Button
            classStyle='w-[175px] flex justify-center uppercase'
            text={isPlay ? 'Tạm dừng' : 'Tiếp tục phát'}
            handleClick={onPlaylistPlay}
          /> : <Button
            classStyle='w-[175px] flex justify-center uppercase'
            text={'Bắt đầu phát'}
            handleClick={onPlaylistPlay}
          />
        }
      </div>
    </div>
  )
}

export default PlayListInfo
