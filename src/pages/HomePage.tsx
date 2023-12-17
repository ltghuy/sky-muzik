import React from 'react'
import Loading from '@components/Loading'
import Slider from '@components/Slider'
import Playlist from '@containers/PlayList'
import { useHomeBanner, useHomePlayList } from '@hooks/home-section'

const HomePage: React.FC = () => {
  const { data, isLoading } = useHomeBanner()
  const { data: playlistData, isLoading: isPlaylistLoading } = useHomePlayList()

  return (
    <>
      <div className={`home-slider w-full h-40 md:h-60 overflow-hidden relative ${isLoading && 'rounded-2xl'}`}>
        {isLoading && <Loading />}
        {data && <Slider data={data} cols={3} />}
      </div>
      <div className="playlist-wrapper mt-6 md:mt-12 relative rounded-2xl min-h-[300px]">
        {isPlaylistLoading && <Loading />}
        {playlistData &&
          playlistData.map((item: any, index: number) =>
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
    </>
  )
}

export default HomePage
