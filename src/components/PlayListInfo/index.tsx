import React, { useEffect, useMemo, useRef } from 'react'
import Button from '@components/Button'
import { Link, useParams } from 'react-router-dom'
import { useAudioStore } from '@stores/useAudioStore'
import { useDetailPlaylist } from '@hooks/detail-playlist'
import { PlaylistDetailProps } from '@models/common'
import { ReactComponent as LikedIcon } from '@static/icons/heart-icon.svg'

const PlayListInfo: React.FC<PlaylistDetailProps> = ({ thumbnailM, title, contentLastUpdate, artists, like, isCurrentPlaylist }) => {
  const { isPlay, currentAlbum, playListSong, changePlayIcon, setCurrentIndexPlaylist, setSongId, setCurrentAlbum, setAutoplay, setPlaylistSong } = useAudioStore()
  const params = useParams<{ playlistID: string }>()
  const { data } = useDetailPlaylist(params.playlistID ?? currentAlbum)
  const ref = useRef<HTMLDivElement | null>(null)
  const playlistLastUpdate = contentLastUpdate && (new Date(contentLastUpdate * 1000)).toLocaleDateString("vi-VN")

  const isCurrentAlbum = useMemo(() => {
    return currentAlbum === params.playlistID
  }, [params])

  const onPlaylistPlay = () => {
    const audio = document.querySelector('audio')
    if (isCurrentAlbum) {
      if (isPlay) {
        changePlayIcon(false)
        audio?.pause()
      } else {
        changePlayIcon(true)
        audio?.play()
      }
    } else {
      setCurrentAlbum(params.playlistID ?? currentAlbum)
      setCurrentIndexPlaylist(0)
      setSongId(playListSong[0].encodeId)
      setAutoplay(true)
      changePlayIcon(true)
    }
  }

  useEffect(() => {
    setPlaylistSong(data?.song.items)
  }, [data])

  return (
    <div className='playlist-info px-5 sticky top-[calc(var(--header-height)+2rem)]' ref={ref}>
      <div className="playlist-thumbnail w-[200px] lg:w-[65%] relative mx-auto">
        <img
          src={thumbnailM}
          alt={title}
          className={`w-full object-cover shadow-2xl shadow-slate-700 ${isCurrentPlaylist && isPlay ? 'rounded-full animate-rotate' : 'rounded-2xl'}`} />
        {isCurrentAlbum && isPlay &&
          <div className="absolute w-full h-full inset-0 flex justify-center items-center">
            <div className='rounded-full border-[20px] border-slate-200 outline outline-4 outline-zinc-700 flex justify-center items-center'
            >
              <div className='p-3 bg-white border border-zinc-900 rounded-full'></div>
            </div>
          </div>
        }
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
