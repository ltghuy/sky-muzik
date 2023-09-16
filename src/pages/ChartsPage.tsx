import React, { useState } from 'react'
import { useAudioStore } from '@stores/useAudioStore'
import Button from '@components/Button'
import Loading from '@components/Loading'
import Song from '@components/Song'
import MainLayout from '@containers/MainLayout'
import { useCharts } from '@hooks/charts'

const Chartspage: React.FC = () => {
  const [hasLoadMore, setHasLoadMore] = useState<boolean>(true)
  const [count, setCount] = useState<number>(10)
  const { playListSong, setSongId, setCurrentIndexPlaylist, setPlaylistSong } = useAudioStore()
  const { data, isLoading } = useCharts()

  const loadMoreList = () => {
    setCount(100)
    setHasLoadMore(false)
  }

  const sortRankings = (index: number) => {
    switch (index) {
      case 1: return 'text-stroke-top1'
      case 2: return 'text-stroke-top2'
      case 3: return 'text-stroke-top3'
      default: return 'text-stroke'
    }
  }

  const playCharts = (index: number) => {
    if (data) {
      setCurrentIndexPlaylist(index)
      setSongId(playListSong[index].encodeId)
      setPlaylistSong(data.RTChart.items)
    }
  }

  return (
    <MainLayout>
      <div className="page-content">
        <div className='charts-wrapper min-h-[500px] mb-5 relative rounded-2xl'>
          {isLoading && <Loading />}
          {
            data &&
            <>
              <section className="charts-list">
                <h2 className='title text-3xl text-black dark:text-white font-inter font-bold mb-5'>
                  Bảng xếp hạng
                </h2>
                {
                  data.RTChart.items.slice(0, count)
                    .map((item: any, index: number) => (
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
                  hasLoadMore && (
                    <div className='flex justify-center mt-5'>
                      <Button text='Xem top 100' handleClick={loadMoreList} />
                    </div>
                  )
                }
              </section>
              <section className="new-release mt-10">
                <h2 className='title text-3xl text-black dark:text-white font-inter font-bold mb-5'>
                  Mới phát hành
                </h2>
                <div className="new-release__list grid grid-cols-1 lg:grid-cols-2 -mx-2">
                  {
                    data.newRelease.map((item: any, index: number) => (
                      <div key={index} className='mb-2 mx-2'>
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
                        />
                      </div>
                    ))
                  }
                </div>
              </section>
            </>
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default Chartspage
