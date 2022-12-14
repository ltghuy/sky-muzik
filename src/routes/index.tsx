import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Top100 from '../pages/Top100Page'
import HomePage from '../pages/HomePage'
import PlaylistPage from '../pages/PlaylistPage'
import SearchPage from '../pages/SearchPage'
import ArtistPage from '../pages/ArtistPage'
import MVPage from '../pages/MVPage'
import Chartspage from '../pages/ChartsPage'

const RouterPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/top100' element={ <Top100 />} />
      <Route path='/charts' element={ <Chartspage />} />
      <Route path='/mv' element={ <MVPage />} />
      <Route path='/playlist' element={ <PlaylistPage /> }>
        <Route path=':playlistID' element={ <PlaylistPage />} />
      </Route>
      <Route path="/search" element={<SearchPage />}>
        <Route path=":keyword" element={<SearchPage />} />
      </ Route>
      <Route path="/artist" element={<ArtistPage />}>
        <Route path=":artistID" element={<ArtistPage />} />
      </ Route>
    </Routes>
  )
}

export default RouterPage
