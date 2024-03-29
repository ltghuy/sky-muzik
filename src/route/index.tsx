import FullScreenLoading from '@components/Loading/FullScreen';
import MainLayout from '@containers/MainLayout';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
const Top100 = lazy(() => import('@pages/Top100Page'));
const HomePage = lazy(() => import('@pages/HomePage'));
const PlaylistPage = lazy(() => import('@pages/PlaylistPage'));
const SearchPage = lazy(() => import('@pages/SearchPage'));
const ArtistPage = lazy(() => import('@pages/ArtistPage'));
const MVPage = lazy(() => import('@pages/MVPage'));
const ChartPage = lazy(() => import('@pages/ChartsPage'));

const RouterPage: React.FC = () => {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/top100' element={<Top100 />} />
          <Route path='/charts' element={<ChartPage />} />
          <Route path='/mv' element={<MVPage />} />
          <Route path='/playlist' element={<PlaylistPage />}>
            <Route path=':playlistID' element={<PlaylistPage />} />
          </Route>
          <Route path="/search" element={<SearchPage />}>
            <Route path=":keyword" element={<SearchPage />} />
          </ Route>
          <Route path="/artist" element={<ArtistPage />}>
            <Route path=":artistID" element={<ArtistPage />} />
          </ Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default RouterPage
