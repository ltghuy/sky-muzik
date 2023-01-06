import React from 'react'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'

const MyMusicPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="page-content">
        <h3 className='music-wrapper min-h-[500px] mb-5 relative rounded-2xl'>
          <Loading />
        </h3>
      </div>
    </MainLayout>
  )
}

export default MyMusicPage
