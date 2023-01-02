import React from 'react'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'

const ChartPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="px-8 py-5">
        <h3 className='chart-wrapper min-h-[500px] mb-5 relative rounded-2xl'>
          <Loading />
        </h3>
      </div>
    </MainLayout>
  )
}

export default ChartPage
