import MVPanel from "@components/MVPanel"
import Navbar from "@components/Navbar"
import { LOCAL_STORAGE_KEYS } from "@constants/localStorageKeys"
import Player from "@containers/Player"
import { useDetailPlaylist } from "@hooks/detail-playlist"
import { useAudioStore } from "@stores/useAudioStore"
import { useMVStore } from "@stores/useMVStore"
import React, { useEffect } from "react"
import RouterPage from "./route"

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
