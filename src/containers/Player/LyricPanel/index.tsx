import React, { useContext, useRef, useEffect} from 'react'
import { AudioContext } from '..'
import { useAppSelector, useAppDispatch } from '../../../utils/customRedux'
import { setOpenLyric } from '../../../redux/features/audioSlice'
import useLyric from '../../../hooks/useLyric'
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
    if (lyricRef.current) {
      lyricRef.current.scroll({top: 0 ,behavior: 'smooth'})
    }
  }, [songId, audioRef])

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
          <div className="lyric-thumbnail w-max flex-shrink-0">
            <img src={songInfo.thumbnailM} alt={songInfo.title} />
          </div>
          <div className="lyric-timeline flex-1 h-full ml-20 rounded-3xl overflow-y-scroll hidden-scrollbar" ref={lyricRef}>
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
                  className={`my-8 mx-0 transition-all duration-500 box-border ${inTimeLine(e) ? "origin-[center_left] scale-105" : ""}`}
                  onDoubleClick={() => {
                    if (audioRef) {
                      audioRef.currentTime = e.startTime / 1000
                    }
                  }}
                  >
                  <span
                    className={`text-[color:var(--white)] text-[42px] leading-[50px] font-inter cursor-pointer select-none inline-block ${inTimeLine(e) ? "opacity-100" : "opacity-30"}`}
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
