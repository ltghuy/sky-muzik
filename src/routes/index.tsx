import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MVPage from '../pages/MVPage'
import Top100 from '../pages/Top100Page'
import HomePage from '../pages/HomePage'
import ChartPage from '../pages/ChartPage'
import PlaylistPage from '../pages/PlaylistPage'

const RouterPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/top100' element={ <Top100 />} />
      <Route path='/chart' element={ <ChartPage />} />
      <Route path='/mv' element={ <MVPage />} />
      <Route path='/playlist' element={ <PlaylistPage /> }>
        <Route path=':playlistID' element={ <PlaylistPage />} />
      </Route>
    </Routes>
  )
}

export default RouterPage
