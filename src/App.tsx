import React, { useEffect } from "react"
import { useMVStore } from "@stores/useMVStore"
import { useAudioStore } from "@stores/useAudioStore"
import Navbar from "@components/Navbar"
import Player from "@containers/Player"
import MVPanel from "@components/MVPanel"
import RouterPage from "./route"
import { useDetailPlaylist } from "@hooks/detail-playlist"
import { LOCAL_STORAGE_KEYS } from "@constants/localStorageKeys"

const App: React.FC = () => {
  const { currentAlbum, setPlaylistSong } = useAudioStore()
  const { isShowMV } = useMVStore()
  const { data } = useDetailPlaylist(currentAlbum)

  useEffect(() => {
    (
      async () => {
        if (currentAlbum && data) {
          setPlaylistSong(data.song.items)
        }
      }
    )()
  }, [currentAlbum, data])

  useEffect(() => {
    const themeMode = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME_MODE)
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
