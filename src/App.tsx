import React, { useEffect } from "react"
import { getDetailPlaylist } from "./api/detailPlaylist"
import { useAppSelector, useAppDispatch } from "./utils/customRedux"
import { setPlaylistSong } from "./redux/features/audioSlice"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import RouterPage from "./routes"
import Navbar from "./components/Navbar"
import Player from "./containers/Player"

const App: React.FC = () => {
  const currentAlbum = useAppSelector((state) => state.audio.currentAlbum)
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

  return (
    <Provider store={ store }>
      <Navbar />
      <RouterPage />
      <Player />
    </Provider>
  )
}

export default App
