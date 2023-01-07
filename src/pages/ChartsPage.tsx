import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/customRedux'
import { setCurrentAlbum, setPlaylistSong, setSongId, setCurrentIndexPlaylist } from '../redux/features/audioSlice'
import { getCharts } from '../api/charts'
import Button from '../components/Button'
import Loading from '../components/Loading'
import Song from '../components/Song.tsx'
import MainLayout from '../containers/MainLayout'

interface ChartsProps {
  RTChart : {
    promotes: [],
    items: []
  },
  newRelease: [],
  weekChart: []
}

const Chartspage: React.FC = () => {
  const [chartData, setChartData] = useState<ChartsProps>()
  const [hasLoadmore, setHasLoadmore] = useState<boolean>(true)
  const [count, setCount] = useState<number>(10)
  const playlistSong: any = useAppSelector((state) => state.audio.playListSong)
  const dispatch = useAppDispatch()

  const loadMoreList = () => {
    setCount(100)
    setHasLoadmore(false)
  }

  const sortRankings =  (index: number) => {
    switch (index) {
      case 1: return 'text-stroke-top1'
      case 2: return 'text-stroke-top2'
      case 3: return 'text-stroke-top3'
      default: return 'text-stroke'
    }
  }

  const playCharts = (index: number) => {
    if (chartData) {
      dispatch(setPlaylistSong(chartData.RTChart.items))
      dispatch(setSongId(playlistSong[index].encodeId))
      dispatch(setCurrentIndexPlaylist(index))
      dispatch(setCurrentAlbum(''))
    }
  }

  useEffect(() => {
    (
      async () => {
        const data = await getCharts()
        setChartData(data)
      }
    )()
  }, [])

  return (
    <MainLayout>
      <div className="page-content">
        <div className='charts-wrapper min-h-[500px] mb-5 relative rounded-2xl'>
          {
            chartData ? (
              <section className="charts-list">
                <h2 className='title text-3xl text-black dark:text-white font-inter font-bold mb-5'>
                  Bảng xếp hạng
                </h2>
                {
                  chartData.RTChart.items.slice(0, count).map((item: any, index: number) => (
                    <div className='item flex justify-between items-center' key={index}>
                      <div className="number w-16 flex-shrink-0 text-center font-black">
                        <span className={`text-transparent text-4xl ${sortRankings(index + 1)}`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="dash text-4xl text-gray-500 px-2 mr-4">-</div>
                      <Song 
                        index={index}
                        thumbnail={item?.thumbnail}
                        title={item?.title}
                        encodeId={item?.encodeId}
                        duration={item?.duration}
                        streamingStatus={item?.streamingStatus}
                        artists={item?.artists}
                        artistsNames={item?.artistsNames}
                        album={item?.album}
                        handleClick={() => playCharts(index)}
                      />
                    </div>
                  ))
                }
                {
                  hasLoadmore && (
                    <div className='flex justify-center mt-5'>
                      <Button text='Xem top 100' handleClick={loadMoreList} />
                    </div>
                  )
                }
              </section>
            ) 
            : <Loading />
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default Chartspage
