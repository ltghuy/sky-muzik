import React, { useState, useEffect } from 'react'
import { getHomePlaylist, getHomeBanner } from '../api/home'
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
      <Slider data={sliderList} cols={3} />
      {
        playList && playList.map((item: any, index: number) => 
          <Playlist 
            key={index} 
            title={item.title}
            sectionId={item.sectionId}
            link={item.link}
            playList={item.items}
          />
        )
      }
    </MainLayout>
  )
}

export default HomePage
