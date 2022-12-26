import React, { useContext, useRef, useEffect } from 'react'
import { AudioContext } from '..'
import { useAppSelector, useAppDispatch } from '../../../utils/customRedux'
import { setOpenLyric, changePlayIcon } from '../../../redux/features/audioSlice'
import useLyric from '../../../hooks/useLyric'
import PlayControl from '../PlayerCenter/Controls/playControl'
import PreviousControl from '../PlayerCenter/Controls/previousControl'
import NextControl from '../PlayerCenter/Controls/nextControl'
import { ReactComponent as ArrowIcon } from '../../../static/icons/arrow-right-icon.svg'

const LyricPanel: React.FC = () => {
  const isShowLyric = useAppSelector((state) => state.audio.isLyric)
  const songId = useAppSelector((state) => state.audio.songID)
  const songInfo = useAppSelector((state) => state.audio.infoSong)
  const currentTime = useAppSelector((state) => state.audio.currentTime)
  const dispatch = useAppDispatch()

  const audioRef = useContext(AudioContext)
  const lyricRef = useRef<HTMLDivElement>(null)
  const lyric = useLyric(songId)

  const closeLyric = () => {
    dispatch(setOpenLyric(false))
  }

  const inTimeLine = (e: any) => {
    if (e.startTime <= currentTime * 1000 && currentTime * 1000 <= e.endTime) return true
    else return false
  }

  useEffect(() => {
    lyricRef?.current?.scroll({
      top: 0
    })
  }, [songId, songInfo])

  return (
    <main 
    className={`lyric-panel w-full h-screen fixed top-0 left-0 ${isShowLyric ? 'show-lyric' : 'close-lyric'} duration-1000 ease-in-out overflow-hidden`}>
      <div className="lyric-wrapper flex flex-col w-full h-full bg-[color:var(--primary-dark)]">
        <div className="lyric-top w-full h-[10vh] flex-shrink-0 flex justify-end items-center p-10">
          <button 
            className='text-[color:var(--white)] p-3 bg-gray-50 bg-opacity-30 rounded-full transition'
            onClick={closeLyric} >
            <ArrowIcon className='w-5 h-5 rotate-90' />
          </button>
        </div>
        <div className="lyric-main w-full flex-1 max-h-[90vh] flex items-end px-20 py-10">
          <div className="lyric-thumbnail w-[22rem] h-[22rem] flex-shrink-0 p-5 rounded-2xl relative group">
            <img 
              className='absolute w-full object-cover inset-0 shadow-xl rounded-[inherit] shadow-[color:var(--primary)]'
              src={songInfo.thumbnailM} 
              alt={songInfo.title} />
            <div className="lyric-controls absolute w-full h-full inset-0 rounded-[inherit] bg-black bg-opacity-30 transition hidden group-hover:flex justify-center items-center gap-x-4">
              <PreviousControl />
              <PlayControl />
              <NextControl />
            </div>
          </div>
          <div className="lyric-timeline flex-1 h-full ml-20 space-y-12 overflow-y-scroll hidden-scrollbar" ref={lyricRef}>
            {
            lyric &&
            lyric.map((e: {data: string, startTime: number, endTime: number}, index: number) => {
              if (inTimeLine(e) && isShowLyric) {
                document.getElementById(`line-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              return (
                <div
                  id={`line-${index}`}
                  key={index}
                  className={`transition-all duration-500 box-border ${inTimeLine(e) ? "origin-[center_left] scale-105" : ""}`}
                  onDoubleClick={() => {
                    if (audioRef) {
                      audioRef.currentTime = e.startTime / 1000
                      audioRef.play()
                      dispatch(changePlayIcon(true))
                    }
                  }}
                  >
                  <span
                    className={`text-[42px] leading-[50px] font-inter cursor-pointer select-none inline-block ${inTimeLine(e) ? "text-amber-400" : "text-[color:var(--white)] opacity-70"}`}
                  >
                    { e.data } 
                  </span>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
    </main>
  )
}

export default LyricPanel
