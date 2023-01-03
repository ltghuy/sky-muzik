import React, { useState, useEffect } from 'react'
import { getTop100 } from '../api/top100'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'
import Playlist from '../containers/PlayList'

const Top100: React.FC = () => {
  const [dataTop100, setDataTop100] = useState<Array<Object>>()
  
  useEffect(() => {
    (
      async () => {
        setDataTop100(await getTop100())
      }
    )()
  }, [])

  return (
    <MainLayout>
      <div className="page-content">
        <div className="top100 rounded-2xl relative min-h-[500px]">
          {
            dataTop100 ?
            dataTop100.map((item: any, index: number) =>
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

export default Top100
