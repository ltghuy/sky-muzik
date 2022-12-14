import React, { useState, useEffect } from 'react'
import { getDetailPlaylist } from '../api/detailPlaylist'
import { PlaylistDetailProps } from '../types/common'
import { useParams } from 'react-router-dom'
import MainLayout from '../containers/MainLayout'
import PlayListInfo from '../components/PlayListInfo'
import Loading from '../components/Loading'

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
      <div className='playlist grid grid-cols-5 pt-5'>
        <div className='col-span-2 px-5 relative min-h-[200px]'>
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
        </div>
        <section className="col-span-3">
          Track list here
        </section>
      </div>
    </MainLayout>
  )
}

export default PlaylistPage
