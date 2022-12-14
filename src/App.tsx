import React, { useEffect } from "react"
import { getDetailPlaylist } from "./api/detailPlaylist"
import { useAppSelector, useAppDispatch } from "./utils/customRedux"
import { setPlaylistSong } from "./redux/features/audioSlice"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import RouterPage from "./routes"
import Navbar from "./components/Navbar"
import Player from "./containers/Player"
import MVPanel from "./components/MVPanel"

const App: React.FC = () => {
  const currentAlbum = useAppSelector((state) => state.audio.currentAlbum)
  const isShowMV = useAppSelector((state) => state.mv.isShowMV)
  const dispatch = useAppDispatch()

  useEffect(() => {
    (
      async () => {
        if (currentAlbum) {
          const detailPlayList = await getDetailPlaylist(currentAlbum)
          dispatch(setPlaylistSong(detailPlayList.song.items))
        }
      }
    )()
  }, [currentAlbum])

  useEffect(() => {
    const themeMode = localStorage.getItem('themeMode')
    if (themeMode) {
      document.body.classList.add(themeMode)
    }
  }, [])

  return (
    <Provider store={ store }>
      <Navbar />
      <RouterPage />
      <Player />
      {isShowMV && <MVPanel />}
    </Provider>
  )
}

export default App
