import React from 'react'
import MainLayout from '@containers/MainLayout'
import Loading from '@components/Loading'
import Playlist from '@containers/PlayList'
import { useTop100 } from '@hooks/top100'

const Top100: React.FC = () => {
  const { data, isLoading } = useTop100()
  return (
    <MainLayout>
      <div className="page-content">
        <div className="top100 rounded-2xl relative min-h-[500px]">
          {isLoading && <Loading />}
          {data &&
            data.map((item: any, index: number) =>
              <Playlist
                key={index}
                title={item.title}
                sectionId={item.sectionId}
                link={item.link}
                playList={item.items}
              />
            )
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default Top100
