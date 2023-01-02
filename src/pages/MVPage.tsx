import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/customRedux'
import { setCurrentCount, setCurrentPage } from '../redux/features/mvSlice'
import { getMVList } from '../api/mv'
import { MVProps } from '../types/common'
import useInfinityScroll from '../hooks/useInfinityScroll'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'
import MVItem from '../components/MVItem'

const MVPage: React.FC = () => {
  const [mvList, setMVList] = useState<any>([])
  const [loadMore, setLoadMore] = useState<boolean>(false)
  const currentPage = useAppSelector((state) => state.mv.currentPage)
  const currentCount = useAppSelector((state) => state.mv.currentCount)
  const dispatch = useAppDispatch()

  const fetchMoreMV = () => {
    setLoadMore(true)
    if (currentPage === 4 && currentCount > 100) {
      return
    }
    if (currentCount >= 200) {
      dispatch(setCurrentPage(currentPage + 1))
      dispatch(setCurrentCount(21))
    } 
    else {
      dispatch(setCurrentCount(currentCount + 21))
    }
  }

  useEffect(() => {
    (
      async () => {
        const data: {items: []} = await getMVList("IWZ9Z08I", currentPage, currentCount)
        setMVList(data.items)
        setLoadMore(false)
      }
    )()
  }, [currentCount, currentPage])

  useInfinityScroll('.main-content', '#mv-list', fetchMoreMV, mvList.length)

  return (
    <MainLayout>
      <div className="px-8 py-5">
        <div className="mv-wrapper space-y-10 min-h-[500px] pb-[var(--player-height)] relative rounded-2xl">
          {
            mvList.length > 0 ?
            <div className="mv-list grid grid-cols-3 gap-x-5 gap-y-10" id='mv-list'>
              {
                mvList.map((e: MVProps, index: number) => (
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
             :
            <Loading />
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
