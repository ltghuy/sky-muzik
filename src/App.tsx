import React, { useEffect } from "react"
import { useMVStore } from "./store/useMVStore"
import { useAudioStore } from "./store/useAudioStore"
import { getDetailPlaylist } from "./api/detailPlaylist"
import RouterPage from "./routes"
import Navbar from "./components/Navbar"
import Player from "./containers/Player"
import MVPanel from "./components/MVPanel"

const App: React.FC = () => {
  const { currentAlbum, setPlaylistSong } = useAudioStore()
  const { isShowMV } = useMVStore()

  useEffect(() => {
    (
      async () => {
        if (currentAlbum) {
          const detailPlayList = await getDetailPlaylist(currentAlbum)
          setPlaylistSong(detailPlayList.song.items)
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
    <>
      <Navbar />
      <RouterPage />
      <Player />
      {isShowMV && <MVPanel />}
    </>
  )
}

export default App
