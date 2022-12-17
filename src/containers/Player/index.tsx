import React, { useEffect, useRef, createContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/customRedux'
import { getSong, getSongInfo } from '../../api/song'
import { setCurrentTime, setDuration, setCurrentIndexPlaylist, setSongId, setSrcAudio, setInfoSong, changePlayIcon } from '../../redux/features/audioSlice'
import PlayerLeft from './PlayerLeft'
import PlayerCenter from './PlayerCenter'
import PlayerRight from './PlayerRight'

export const AudioContext = createContext<HTMLAudioElement | null | undefined>(null)

const Player: React.FC = () => {
  const audioRef = useRef<any>(null)
  const songId = useAppSelector((state) => state.audio.songID)
  const srcAudio = useAppSelector((state) => state.audio.srcAudio)
  const isLoop = useAppSelector((state) => state.audio.isLoop)
  const playlistSong: any = useAppSelector((state) => state.audio.playListSong)
  const currentIndexPlaylist = useAppSelector((state) => state.audio.currentIndexPlaylist)
  const dispatch = useAppDispatch()

  const handleAudioEnd = () => {
    if (!isLoop) {
      dispatch(setCurrentTime(0))
      dispatch(changePlayIcon(false))
      if (playlistSong !== undefined && playlistSong.length > 0) {
        let currentIndex
        if (currentIndexPlaylist === playlistSong.length - 1) {
          currentIndex = 0
        } else {
          currentIndex = currentIndexPlaylist + 1
        }
        
        dispatch(setCurrentIndexPlaylist(currentIndex))
        dispatch(setSongId(playlistSong[currentIndex].encodeId))
      }
    }
  }

  const handleAudioLoaded = () => {
    if (audioRef.current) {
      dispatch(setDuration((audioRef.current.duration)))
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
                artistsNames: infoSong.artistsNames,
                artists: infoSong.artists,
                album: infoSong.album
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
    <section className='player fixed left-0 bottom-0 w-full h-[var(--player-height)] z-50 bg-[color:var(--primary-dark)]'>
      <main className="player-wrapper h-full px-5 flex justify-center items-center">
        <AudioContext.Provider value={audioRef.current}>
          <PlayerLeft />
          <PlayerCenter />
          <PlayerRight />
        </AudioContext.Provider>
        <audio
          ref={audioRef}
          src={srcAudio}
          className="hidden"
          loop={isLoop}
          autoPlay={true}
          hidden
          onTimeUpdate={handleAudioUpdate}
          onLoadedData={handleAudioLoaded}
          onEnded={handleAudioEnd}
        />
      </main>
    </section>
  )
}

export default Player
