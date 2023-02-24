import React, { useContext, useRef, useEffect, useState } from 'react'
import { AudioContext } from '..'
import { useAudioStore } from '../../../store/useAudioStore'
import { KaraLineType } from '../../../types/common'
import useLyric from '../../../hooks/useLyric'
import PlayControl from '../PlayerCenter/Controls/playControl'
import PreviousControl from '../PlayerCenter/Controls/previousControl'
import NextControl from '../PlayerCenter/Controls/nextControl'
import Karaoke from '../../../components/Karaoke'
import { ReactComponent as ArrowIcon } from '../../../static/icons/arrow-right-icon.svg'

const LyricPanel: React.FC = () => {
  const [lyricOptions, setLyricOptions] = useState<'lyric' | 'karaoke'>('lyric')
  const { isLyric, songID, infoSong, currentTime, setOpenLyric, changePlayIcon } = useAudioStore()

  const audioRef = useContext(AudioContext)
  const lyricRef = useRef<HTMLDivElement>(null)
  const lyric = useLyric(songID)

  const closeLyric = () => {
    setOpenLyric(false)
  }

  const inTimeLine = (e: KaraLineType) => {
    if (e.startTime <= currentTime * 1000 && currentTime * 1000 <= e.endTime) return true
    return false
  }

  useEffect(() => {
    lyricRef?.current?.scroll({
      top: 0
    })
  }, [songID, infoSong])

  return (
    <main 
    className={`lyric-panel w-full h-screen fixed top-0 left-0 ${isLyric ? 'show-panel' : 'close-panel'} duration-1000 ease-in-out overflow-hidden`}>
      <div className="lyric-wrapper flex flex-col w-full h-full bg-[color:var(--primary-dark)]">
        <div className="lyric-top w-full h-[10vh] flex-shrink-0 flex justify-center items-center p-10 relative">
          <button 
            className='text-white p-3 bg-[color:var(--primary-light)] rounded-full absolute right-5'
            onClick={closeLyric} >
            <ArrowIcon className='w-5 h-5 rotate-90' />
          </button>
          <div className="lyric-options h-9 font-inter bg-[color:var(--primary-light)] flex rounded-3xl">
            <button 
              className={`text-white font-semibold text-base w-40 rounded-3xl transition ${lyricOptions === 'karaoke' && 'bg-[color:var(--primary)]'}`}
              onClick={() => setLyricOptions('karaoke')}>
              Karaoke
            </button>
            <button 
              className={`text-white font-semibold text-base w-40 rounded-3xl transition ${lyricOptions === 'lyric' && 'bg-[color:var(--primary)]'}`}
              onClick={() => setLyricOptions('lyric')}>
              Lời bài hát
            </button>
          </div>
        </div>
        <div className="lyric-main w-full flex-1 max-h-[90vh] flex items-end px-16 py-10 overflow-hidden">
          {
            lyric && lyricOptions === 'lyric' &&
            <>
              <div className="lyric-thumbnail w-[22rem] h-[22rem] flex-shrink-0 p-5 rounded-2xl relative group">
                <img 
                  className='absolute w-full object-cover inset-0 shadow-xl rounded-[inherit] shadow-[color:var(--primary)]'
                  src={infoSong.thumbnailM} 
                  alt={infoSong.title} />
                <div className="lyric-controls absolute w-full h-full inset-0 rounded-[inherit] bg-black bg-opacity-30 transition hidden group-hover:flex justify-center items-center gap-x-4">
                  <PreviousControl />
                  <PlayControl />
                  <NextControl />
                </div>
              </div>
              <div className="lyric-timeline flex-1 h-full ml-20 space-y-10 overflow-y-scroll hidden-scrollbar" ref={lyricRef}>
                {
                  lyric.map((e: KaraLineType, index: number) => {
                    if (inTimeLine(e) && isLyric) {
                      document.getElementById(`line-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
                    }
                    return (
                      <div
                        id={`line-${index}`}
                        key={index}
                        className={`transition-all duration-500 box-border origin-[center_left] ${inTimeLine(e) ? "scale-105" : "scale-95"}`}
                        onDoubleClick={() => {
                          if (audioRef) {
                            audioRef.currentTime = e.startTime / 1000
                            audioRef.play()
                            changePlayIcon(true)
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
            </>
          }
          {
            lyric && lyricOptions === 'karaoke' &&
            <section className='karaoke text-white text-5xl font-inter flex flex-col justify-center items-center w-full h-full'>
              <Karaoke lyric={lyric} />
            </section>
          }
        </div>
      </div>
    </main>
  )
}

export default LyricPanel
