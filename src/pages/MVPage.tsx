import React from 'react'
import Loading from '@components/Loading'
import MVItem from '@components/MVItem'
import MainLayout from '@containers/MainLayout'
import { INITIAL_LIST_COUNT, MV_ENCODE } from '@constants/mv'
import useInfinityScroll from '@hooks/core/useInfinityScroll'
import { useMV } from '@hooks/mv'
import { MVProps } from '@models/common'
import { useMVStore } from '@stores/useMVStore'

const MVPage: React.FC = () => {
  const { currentCount, currentPage, setCurrentCount, setCurrentPage } = useMVStore()

  const fetchMoreMV = () => {
    if (currentPage === 4 && currentCount > 100) {
      return
    }
    if (currentCount >= 200) {
      setCurrentPage(currentPage + 1)
      setCurrentCount(INITIAL_LIST_COUNT)
    }
    else {
      setCurrentCount(currentCount + INITIAL_LIST_COUNT)
    }
  }
  const { data, isLoading } = useMV(MV_ENCODE, currentPage, currentCount)

  let length = data?.items?.length
  useInfinityScroll('.main-content', '#mv-list', fetchMoreMV, length)

  return (
    <MainLayout>
      <div className="page-content">
        <div className="mv-wrapper space-y-10 min-h-[500px] relative rounded-2xl">
          {isLoading && <Loading />}
          {data &&
            <>
              <div className="mv-list grid grid-cols-2 lg:grid-cols-3 -mx-5" id='mv-list'>
                {
                  data.items.map((e: MVProps) => (
                    <div className="h-72 mb-10 mx-5" key={e.title}>
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
              <div className={`load-more ${data.hasMore ? 'block' : 'hidden'} relative rounded-2xl min-h-[200px]`}>
                <Loading />
              </div>
            </>
          }
        </div>
      </div>
    </MainLayout >
  )
}

export default MVPage
