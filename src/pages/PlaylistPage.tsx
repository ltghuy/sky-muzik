import React, { useState, useEffect } from 'react'
import { getDetailPlaylist } from '../api/detailPlaylist'
import { PlaylistDetailProps } from '../types/common'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../utils/customRedux'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'
import PlayListInfo from '../components/PlayListInfo'
import PlaylistTrack from '../components/PlaylistTrack'

const PlaylistPage: React.FC = () => {
  const currentAlbum = useAppSelector((state) => state.audio.currentAlbum)
  const [isCurrentPlaylist, setIsCurrentPlaylist] = useState<boolean>(false)
  const [dataDetailPlaylist, setDataDetailPlaylist] = useState<PlaylistDetailProps>()
  const params = useParams<{playlistID: string}>()

  useEffect(() => {
    (
      async () => {
        if (params.playlistID) {
          const detailPlayList = await getDetailPlaylist(params.playlistID)
          setDataDetailPlaylist(detailPlayList)
        }
      }
    )()

    if (params.playlistID === currentAlbum) {
      setIsCurrentPlaylist(true)
    }
    else setIsCurrentPlaylist(false)
  }, [params, currentAlbum])

  return (
    <MainLayout>
      <div className='playlist grid grid-cols-8 pt-10 pb-5 px-8'>
        <section className='col-span-3 relative min-h-[200px] rounded-3xl'>
          {
            dataDetailPlaylist ? 
            <PlayListInfo 
              thumbnailM={dataDetailPlaylist?.thumbnailM}
              title={dataDetailPlaylist?.title}
              contentLastUpdate={dataDetailPlaylist?.contentLastUpdate}
              artists={dataDetailPlaylist?.artists}
              like={dataDetailPlaylist?.like}
              isCurrentPlaylist={isCurrentPlaylist}
            /> :
            <Loading />
          }
        </section>
        <section className="col-span-5 relative min-h-[500px] rounded-3xl ml-5">
          {
            dataDetailPlaylist ?
            <PlaylistTrack
              description={dataDetailPlaylist?.description}
              song={dataDetailPlaylist?.song}
              isCurrentPlaylist={isCurrentPlaylist}
            /> :
            <Loading />
          }
        </section>
      </div>
    </MainLayout>
  )
}

export default PlaylistPage
