import React, { useState } from 'react'
import { useMVStore } from '../store/useMVStore'
import { useQuery } from 'react-query'
import { getMVList } from '../api/mv'
import { MVProps } from '../types/common'
import useInfinityScroll from '../hooks/useInfinityScroll'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'
import MVItem from '../components/MVItem'

const MVPage: React.FC = () => {
  const [loadMore, setLoadMore] = useState<boolean>(false)
  const { currentCount, currentPage, setCurrentCount, setCurrentPage } = useMVStore()

  const fetchMoreMV = () => {
    setLoadMore(true)
    if (currentPage === 4 && currentCount > 100) { // limit mv items 
      setLoadMore(false)
      return
    }
    if (currentCount >= 200) {
      setCurrentPage(currentPage + 1)
      setCurrentCount(21)
    } 
    else {
      setCurrentCount(currentCount + 21)
    }
  }

  const mvQuery = useQuery(["mvList", currentPage, currentCount], async () => {
    const result = await getMVList("IWZ9Z08I", currentPage, currentCount)
    return result
  }, { staleTime: 60000, keepPreviousData: true })

  let mvlistLength = mvQuery.data?.items?.length
  useInfinityScroll('.main-content', '#mv-list', fetchMoreMV, mvlistLength)

  return (
    <MainLayout>
      <div className="page-content">
        <div className="mv-wrapper space-y-10 min-h-[500px] pb-[var(--player-height)] relative rounded-2xl">
          { mvQuery.isLoading && <Loading /> }
          { mvQuery.isSuccess &&
            <div className="mv-list grid grid-cols-3 gap-x-5 gap-y-10" id='mv-list'>
              {
                mvQuery.data.items.map((e: MVProps, index: number) => (
                  <div className="h-72" key={index}>
                    <MVItem 
                      artist={e.artist}
                      artistsNames={e.artistsNames}
                      encodeId={e.encodeId}
                      thumbnailM={e.thumbnailM}
                      title={e.title}
                    />
                  </div>
                ))
            }
            </div>
          }
        </div>
        <div className={`load-more ${loadMore ? 'block' : 'hidden'} relative rounded-2xl min-h-[200px]`}>
          <Loading />
        </div>
      </div>
    </MainLayout>
  )
}

export default MVPage
