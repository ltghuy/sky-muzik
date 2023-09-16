import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAudioStore } from '@stores/useAudioStore'
import Loading from '@components/Loading'
import MainLayout from '@containers/MainLayout'
import PlayListInfo from '@components/PlayListInfo'
import PlaylistTrack from '@components/PlaylistTrack'
import { useDetailPlaylist } from '@hooks/detail-playlist'

const PlaylistPage: React.FC = () => {
  const { currentAlbum } = useAudioStore()
  const { playlistID } = useParams<{ playlistID: string }>()
  const { data, isLoading } = useDetailPlaylist(playlistID ?? currentAlbum)

  const isCurrentPlaylist = useMemo(() => {
    return playlistID === currentAlbum
  }, [currentAlbum, playlistID])

  return (
    <MainLayout>
      <div className='playlist grid grid-cols-8 pt-10 page-content'>
        <section className='col-span-8 lg:col-span-3 relative min-h-[200px] rounded-3xl'>
          {isLoading && <Loading />}
          {
            data &&
            <PlayListInfo
              thumbnailM={data?.thumbnailM}
              title={data?.title}
              contentLastUpdate={data?.contentLastUpdate}
              artists={data?.artists}
              like={data?.like}
              isCurrentPlaylist={isCurrentPlaylist}
            />
          }
        </section>
        <section className="col-span-8 lg:col-span-5 relative min-h-[500px] rounded-3xl ml-5">
          {isLoading && <Loading />}
          {
            data &&
            <PlaylistTrack
              description={data?.description}
              song={data?.song}
              isCurrentPlaylist={isCurrentPlaylist}
            />
          }
        </section>
      </div>
    </MainLayout>
  )
}

export default PlaylistPage
