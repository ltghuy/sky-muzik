import React, { useState, useEffect } from 'react'
import { getMVList } from '../api/mv'
import { MVProps } from '../types/common'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'
import MVItem from '../components/MVItem'

const MVPage: React.FC = () => {
  const [mvList, setMVList] = useState<any>([])

  const splitArr = (originalArr: Array<any>, number: number) => {
    const splittedArray = []
    while (originalArr.length > 0) {
      splittedArray.push(originalArr.splice(0,number))
    }
    return splittedArray
  }

  useEffect(() => {
    (
      async () => {
        const data: {items: []} = await getMVList("IWZ9Z08I", 1, 18)
        setMVList(splitArr(data.items, 3))
      }
    )()
  }, [])

  return (
    <MainLayout>
      <div className="px-8 py-5">
        <div className="mv-wrapper space-y-10 min-h-[500px] relative rounded-2xl">
          {
            mvList.length > 0 ?
            mvList.map((mv: any, index: number) => (
              <div key={index} className="mv-list grid grid-cols-3 gap-x-5">
                {
                  mv.map((e: MVProps) => (
                    <MVItem 
                      key={e.title}
                      artist={e.artist}
                      artistsNames={e.artistsNames}
                      encodeId={e.encodeId}
                      thumbnailM={e.thumbnailM}
                      title={e.title}
                    />
                  )) 
                }
              </div>
            )) :
            <Loading />
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default MVPage
