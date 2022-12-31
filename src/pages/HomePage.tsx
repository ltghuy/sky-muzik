import React, { useState, useEffect } from 'react'
import { getHomePlaylist, getHomeBanner } from '../api/home'
import Loading from '../components/Loading'
import Slider from '../components/Slider'
import MainLayout from '../containers/MainLayout'
import Playlist from '../containers/PlayList'

const HomePage: React.FC = () => {
  const [sliderList, setSliderList] = useState<any>([])
  const [playList, setPlaylist] = useState<any>([])

  useEffect(() => {
    (
      async () => {
        setSliderList(await getHomeBanner())
        setPlaylist(await getHomePlaylist())
      }
    )()
  }, [])

  return (
    <MainLayout>
      <div className="px-8 py-5">
        <div className="w-full h-60 rounded-2xl overflow-hidden relative">
          {
            sliderList.length > 0 ? <Slider data={sliderList} cols={3} /> : <Loading />
          }
        </div>
        <div className="playlist-wrapper mt-12 relative rounded-2xl min-h-[300px]">
          {
            playList.length > 0 ?
            playList.map((item: any, index: number) =>
              <Playlist
                key={index}
                title={item.title}
                sectionId={item.sectionId}
                link={item.link}
                playList={item.items}
              />
            ) : <Loading />
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default HomePage
