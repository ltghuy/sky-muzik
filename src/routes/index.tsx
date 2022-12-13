import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ChartPage from '../pages/ChartPage'
import HomePage from '../pages/HomePage'
import MVPage from '../pages/MVPage'
import Top100 from '../pages/Top100Page'

const RouterPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/top-100' element={ <Top100 />} />
      <Route path='/chart' element={ <ChartPage />} />
      <Route path='/mv' element={ <MVPage />} />
    </Routes>
  )
}

export default RouterPage
