import React from 'react'
import { useQuery } from 'react-query'
import { getHomePlaylist, getHomeBanner } from '../api/home'
import Loading from '../components/Loading'
import Slider from '../components/Slider'
import MainLayout from '../containers/MainLayout'
import Playlist from '../containers/PlayList'

const HomePage: React.FC = () => {
  const bannerQuery = useQuery('banner', getHomeBanner)
  const playListsQuery = useQuery('playlists', getHomePlaylist, { staleTime: 60000 })

  return (
    <MainLayout>
      <div className="page-content">
        <div className={`home-slider w-full h-60 overflow-hidden relative ${bannerQuery.isLoading && 'rounded-2xl'}`}>
          {bannerQuery.isLoading && <Loading />}
          {bannerQuery.isSuccess && <Slider data={bannerQuery.data} cols={3} />}
        </div>
        <div className="playlist-wrapper mt-12 relative rounded-2xl min-h-[300px]">
          {playListsQuery.isLoading && <Loading />}
          {playListsQuery.isSuccess &&
            playListsQuery.data?.map((item: any, index: number) =>
              <Playlist
                key={index}
                title={item.title}
                sectionId={item.sectionId}
                link={item.link}
                playList={item.items}
              />
            )
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default HomePage
