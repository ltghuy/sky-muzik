import React, { useEffect } from "react"
import { useMVStore } from "@stores/useMVStore"
import { useAudioStore } from "@stores/useAudioStore"
import { getDetailPlaylist } from "@apis/detailPlaylist"
import Navbar from "@components/Navbar"
import Player from "@containers/Player"
import MVPanel from "@components/MVPanel"
import RouterPage from "./route"

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
