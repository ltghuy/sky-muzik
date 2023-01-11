import React, { useEffect, useRef, createContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/customRedux'
import { getSong, getSongInfo } from '../../api/song'
import { setCurrentTime, setDuration, setAutoplay, setCurrentIndexPlaylist, setSongId, setSrcAudio, setInfoSong, changePlayIcon } from '../../redux/features/audioSlice'
import PlayerLeft from './PlayerLeft'
import PlayerCenter from './PlayerCenter'
import PlayerRight from './PlayerRight'
import LyricPanel from './LyricPanel'

export const AudioContext = createContext<HTMLAudioElement | null | undefined>(null)

const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const songId = useAppSelector((state) => state.audio.songID)
  const srcAudio = useAppSelector((state) => state.audio.srcAudio)
  const isLoop = useAppSelector((state) => state.audio.isLoop)
  const volume = useAppSelector((state) => state.audio.volume)
  const autoplay = useAppSelector((state) => state.audio.autoPlay)
  const playlistSong: any = useAppSelector((state) => state.audio.playListSong)
  const currentIndexPlaylist = useAppSelector((state) => state.audio.currentIndexPlaylist)
  const dispatch = useAppDispatch()

  const handleAudioEnd = () => {
    if (!isLoop) {
      if (playlistSong !== undefined && playlistSong.length > 0) {
        let currentIndex
        if (currentIndexPlaylist === playlistSong.length - 1) {
          currentIndex = 0
        } else {
          currentIndex = currentIndexPlaylist + 1
        }
        
        dispatch(setCurrentIndexPlaylist(currentIndex))
        dispatch(setSongId(playlistSong[currentIndex].encodeId))
        dispatch(changePlayIcon(true))
        dispatch(setAutoplay(true))
      }
    } else {
      dispatch(setCurrentTime(0))
      dispatch(changePlayIcon(false))
    }
  }

  const handleAudioLoaded = () => {
    if (audioRef.current) {
      dispatch(setDuration((audioRef.current.duration)))
      audioRef.current.volume = volume
    }
  }

  const handleAudioUpdate = () => {
    if (audioRef.current) {
      dispatch(setCurrentTime((audioRef.current.currentTime)))
    }
  }

  useEffect(() => {
    (
      async () => {
        try {
          if(songId === "") {
            console.log("Song ID not found")
          } else {
            const linkSong = await getSong(songId)
            linkSong[128] ? dispatch(setSrcAudio( linkSong[128] )) : dispatch(setSrcAudio(""))

            const infoSong = await getSongInfo(songId)
            dispatch(setInfoSong(
              {
                title: infoSong.title,
                thumbnail: infoSong.thumbnail,
                thumbnailM: infoSong.thumbnailM,
                artistsNames: infoSong.artistsNames,
                artists: infoSong.artists,
                hasLyric: infoSong.hasLyric,
                mvlink: infoSong.mvlink,
              }
            ))
          }
        } catch(err) {
          console.log(err)
        }
      }
    )()
  }, [songId, dispatch])

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
          autoPlay={autoplay}
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
