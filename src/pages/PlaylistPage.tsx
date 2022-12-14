import React, { useState, useEffect } from 'react'
import { getDetailPlaylist } from '../api/detailPlaylist'
import { PlaylistDetailProps } from '../types/common'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'
import PlayListInfo from '../components/PlayListInfo'
import PlaylistTrack from '../components/PlaylistTrack'

const PlaylistPage: React.FC = () => {
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
  }, [params])

  return (
    <MainLayout>
      <div className='playlist grid grid-cols-8 pt-5'>
        <section className='col-span-3 relative min-h-[200px]'>
          {
            dataDetailPlaylist ? 
            <PlayListInfo 
              thumbnailM={dataDetailPlaylist?.thumbnailM}
              title={dataDetailPlaylist?.title}
              contentLastUpdate={dataDetailPlaylist?.contentLastUpdate}
              artists={dataDetailPlaylist?.artists}
              like={dataDetailPlaylist?.like}
            /> :
            <Loading />
          }
        </section>
        <section className="col-span-5 relative min-h-[500px] ml-5">
          {
            dataDetailPlaylist ?
            <PlaylistTrack
              description={dataDetailPlaylist?.description}
              song={dataDetailPlaylist?.song}
            /> :
            <Loading />
          }
        </section>
      </div>
    </MainLayout>
  )
}

export default PlaylistPage
