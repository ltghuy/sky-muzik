import React, { useCallback, useEffect, useState } from 'react'
import { KaraLineType, WordType } from '@models/common'
import { useAudioStore } from '@stores/useAudioStore'

interface KaraokeProps {
  lyric: KaraLineType[]
}

const Karaoke: React.FC<KaraokeProps> = ({ lyric }) => {
  const { currentTime } = useAudioStore()
  const [index, setIndex] = useState<number>(0)
  const [line1Data, setLine1Data] = useState<KaraLineType>(lyric[index])
  const [line2Data, setLine2Data] = useState<KaraLineType>(lyric[index + 1])

  const inTimeLine = useCallback((line: KaraLineType) => {
    return line.startTime <= currentTime * 1000 && currentTime * 1000 <= line.endTime
  }, [currentTime])

  const isLoaded = useCallback((endTime: number) => {
    return currentTime * 1000 > endTime
  }, [currentTime])

  const getPercentageDuration = useCallback((e: WordType) => {
    const duration = e.endTime - e.startTime
    if (isLoaded(e.endTime) || (duration === 0 && inTimeLine(e))) {
      return 100
    }
    const currentDuration = currentTime * 1000 - e.startTime
    return currentDuration / duration * 100
  }, [currentTime])

  const handleChangeLine = () => {
    lyric.map((e: KaraLineType, index: number) => {
      const line1 = document.querySelector('#kara-line1') as HTMLDivElement
      const line2 = document.querySelector('#kara-line2') as HTMLDivElement

      if (index === lyric.length - 1) return
      if (inTimeLine(e) && index % 2 !== 0 && document) {
        setLine1Data(lyric[index + 1])
        line1.classList.add('animate-fadeIn')
        line2.classList.remove('animate-fadeIn')
      }
      if (inTimeLine(e) && index % 2 === 0 && document) {
        setLine2Data(lyric[index + 1])
        line2.classList.add('animate-fadeIn')
        line1.classList.remove('animate-fadeIn')
      }
    })
    setIndex(index)
  }

  useEffect(() => {
    handleChangeLine()
  }, [currentTime])

  return (
    <section className='flex flex-col items-center font-bold space-y-5 select-none'>
      <div
        id="kara-line1"
        className='h-12 lg:h-20 flex flex-nowrap space-x-2 transition'>
        {
          line1Data.words?.map((word: WordType, index: number) => (
            <div key={index} className='relative w-max h-full whitespace-nowrap'>
              <div className={`h-full ${isLoaded(word.endTime) && 'text-amber-400'}`}>{word.data}</div>
              {
                inTimeLine(line1Data) &&
                <div
                  className='kara-runner absolute w-0 h-full top-0 left-0 text-amber-400 overflow-hidden transition-all ease-linear'
                  style={{ width: `${getPercentageDuration(word)}%` }}>
                  {word.data}
                </div>
              }
            </div>
          ))
        }
      </div>
      <div
        id="kara-line2"
        className='h-12 lg:h-20 flex flex-nowrap space-x-2 transition'>
        {
          line2Data.words?.map((word2: WordType, index: number) => (
            <div key={index} className='relative w-max h-full whitespace-nowrap'>
              <div className={`h-full ${isLoaded(word2.endTime) && 'text-amber-400'}`}>{word2.data}</div>
              {
                inTimeLine(line2Data) &&
                <div
                  className='kara-runner absolute w-0 h-full top-0 left-0 text-amber-400 overflow-hidden transition-all ease-linear'
                  style={{ width: `${getPercentageDuration(word2)}%` }}>
                  {word2.data}
                </div>
              }
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Karaoke
