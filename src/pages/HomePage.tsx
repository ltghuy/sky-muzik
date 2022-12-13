import React, { useState, useEffect } from 'react'
import { getHomePlaylist, getHomeBanner } from '../api/home'
import Slider from '../components/Slider'
import MainLayout from '../containers/MainLayout'

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

  useEffect(() => {
    console.log('List playlist', playList)
  },[ playList])

  return (
    <MainLayout>
      <div className="pt-5">
        <Slider data={sliderList} cols={3} />
      </div>

    </MainLayout>
  )
}

export default HomePage
