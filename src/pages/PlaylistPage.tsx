import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useAudioStore } from '../stores/useAudioStore'
import { getDetailPlaylist } from '../apis/detailPlaylist'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'
import PlayListInfo from '../components/PlayListInfo'
import PlaylistTrack from '../components/PlaylistTrack'

const PlaylistPage: React.FC = () => {
  const { currentAlbum } = useAudioStore()
  const { playlistID } = useParams<{ playlistID: string }>()
  const [isCurrentPlaylist, setIsCurrentPlaylist] = useState<boolean>(false)

  const playListQuery = useQuery(["playListDetail", playlistID], async () => {
    if (playlistID) {
      return await getDetailPlaylist(playlistID)
    }
  }, { staleTime: 60000 })

  useEffect(() => {
    if (playlistID === currentAlbum) {
      setIsCurrentPlaylist(true)
    }
    else setIsCurrentPlaylist(false)
  }, [currentAlbum, playlistID])

  return (
    <MainLayout>
      <div className='playlist grid grid-cols-8 pt-10 page-content'>
        <section className='col-span-8 lg:col-span-3 relative min-h-[200px] rounded-3xl'>
          {playListQuery.isLoading && <Loading />}
          {
            playListQuery.data &&
            <PlayListInfo
              thumbnailM={playListQuery.data?.thumbnailM}
              title={playListQuery.data?.title}
              contentLastUpdate={playListQuery.data?.contentLastUpdate}
              artists={playListQuery.data?.artists}
              like={playListQuery.data?.like}
              isCurrentPlaylist={isCurrentPlaylist}
            />
          }
        </section>
        <section className="col-span-8 lg:col-span-5 relative min-h-[500px] rounded-3xl ml-5">
          {playListQuery.isLoading && <Loading />}
          {
            playListQuery.data &&
            <PlaylistTrack
              description={playListQuery.data?.description}
              song={playListQuery.data?.song}
              isCurrentPlaylist={isCurrentPlaylist}
            />
          }
        </section>
      </div>
    </MainLayout>
  )
}

export default PlaylistPage
