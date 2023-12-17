import LyricPanel from '@containers/Player/LyricPanel'
import PlayerCenter from '@containers/Player/PlayerCenter'
import PlayerLeft from '@containers/Player/PlayerLeft'
import PlayerRight from '@containers/Player/PlayerRight'
import { useSong, useSongInfo } from '@hooks/song'
import { useAudioStore } from '@stores/useAudioStore'
import React, { createContext, useEffect, useRef } from 'react'

export const AudioContext = createContext<HTMLAudioElement | null | undefined>(null)

const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { songID, srcAudio, isLoop, volume, autoPlay, playListSong, currentIndexPlaylist } = useAudioStore()
  const {
    setCurrentTime,
    setDuration,
    setAutoplay,
    setCurrentIndexPlaylist,
    setSongId,
    setSrcAudio,
    setInfoSong,
    changePlayIcon } = useAudioStore()

  const handleAudioEnd = () => {
    if (!isLoop) {
      if (playListSong !== undefined && playListSong.length > 0) {
        let currentIndex
        if (currentIndexPlaylist === playListSong.length - 1) {
          currentIndex = 0
        } else {
          currentIndex = currentIndexPlaylist + 1
        }

        setCurrentIndexPlaylist(currentIndex)
        setSongId(playListSong[currentIndex].encodeId)
        changePlayIcon(true)
        setAutoplay(true)
      }
    } else {
      setCurrentTime(0)
      changePlayIcon(false)
    }
  }

  const handleAudioLoaded = () => {
    if (audioRef.current) {
      setDuration((audioRef.current.duration))
      audioRef.current.volume = volume
    }
  }

  const handleAudioUpdate = () => {
    if (audioRef.current) {
      setCurrentTime((audioRef.current.currentTime))
    }
  }

  const { data } = useSong(songID)
  const { data: songInfo } = useSongInfo(songID)

  useEffect(() => {
    if (songID === "") {
      console.log("Song ID not found!")
    }
    if (data && songInfo) {
      data[128] ? setSrcAudio(data[128]) : setSrcAudio("")
      setInfoSong(
        {
          title: songInfo?.title,
          thumbnail: songInfo?.thumbnail,
          thumbnailM: songInfo?.thumbnailM,
          artistsNames: songInfo?.artistsNames,
          artists: songInfo?.artists,
          hasLyric: songInfo?.hasLyric,
          mvlink: songInfo?.mvlink,
        }
      )
    }
  }, [songID, data, songInfo])

  return (
    <section className='player fixed left-0 bottom-0 w-full h-[var(--player-height)] z-50 bg-[color:var(--primary-darker)]'>
      <AudioContext.Provider value={audioRef.current}>
        <main className="player-wrapper h-full px-5 flex justify-evenly items-center">
          <PlayerLeft />
          <PlayerCenter />
          <PlayerRight />
        </main>
        <LyricPanel />
        <audio
          ref={audioRef}
          src={srcAudio}
          className="hidden"
          loop={isLoop}
          autoPlay={autoPlay}
          hidden
          onTimeUpdate={handleAudioUpdate}
          onLoadedData={handleAudioLoaded}
          onEnded={handleAudioEnd}
        />
      </AudioContext.Provider>
    </section>
  )
}

export default Player
