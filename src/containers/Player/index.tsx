import React, { useEffect, useRef, createContext } from 'react'
import { useAudioStore } from '@stores/useAudioStore'
import PlayerLeft from './PlayerLeft'
import PlayerCenter from './PlayerCenter'
import PlayerRight from './PlayerRight'
import LyricPanel from './LyricPanel'
import { getSong, getSongInfo } from '@apis/song'

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

  useEffect(() => {
    (
      async () => {
        try {
          if (songID === "") {
            console.log("Song ID not found")
          } else {
            const linkSong = await getSong(songID)
            linkSong[128] ? setSrcAudio(linkSong[128]) : setSrcAudio("")

            const infoSong = await getSongInfo(songID)
            setInfoSong(
              {
                title: infoSong.title,
                thumbnail: infoSong.thumbnail,
                thumbnailM: infoSong.thumbnailM,
                artistsNames: infoSong.artistsNames,
                artists: infoSong.artists,
                hasLyric: infoSong.hasLyric,
                mvlink: infoSong.mvlink,
              }
            )
          }
        } catch (err) {
          console.log(err)
        }
      }
    )()
  }, [songID])

  return (
    <section className='player fixed left-0 bottom-0 w-full h-[var(--player-height)] z-50 bg-[color:var(--primary-darker)]'>
      <AudioContext.Provider value={audioRef.current}>
        <main className="player-wrapper h-full px-5 flex justify-center items-center">
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
