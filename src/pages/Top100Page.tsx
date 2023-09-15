import React from 'react'
import { getTop100 } from '../api/top100'
import { useQuery } from 'react-query'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'
import Playlist from '../containers/PlayList'

const Top100: React.FC = () => {

  const top100Query = useQuery('top100', getTop100, { staleTime: 60000 })

  return (
    <MainLayout>
      <div className="page-content">
        <div className="top100 rounded-2xl relative min-h-[500px]">
          {top100Query.isLoading && <Loading />}
          {top100Query.isSuccess &&
            top100Query.data.map((item: any, index: number) =>
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
