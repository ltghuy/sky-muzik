import React, { useEffect, useState } from 'react'
import { KaraLineType } from '../../types/common'
import { useAppSelector } from '../../utils/customRedux'

interface KaraokeProps {
  lyric: KaraLineType[]
}

const Karaoke: React.FC<KaraokeProps> = ({ lyric }) => {
  const currentTime = useAppSelector((state) => state.audio.currentTime)
  const [index, setIndex] = useState<number>(0)
  const [line1Data, setLine1Data] = useState<KaraLineType>(lyric[index])
  const [line2Data, setLine2Data] = useState<KaraLineType>(lyric[index + 1])

  const inTimeLine = (e: KaraLineType) => {
    if (e.startTime <= currentTime * 1000 && currentTime * 1000 <= e.endTime) return true
    return false
  }

  const getPercentageDuration = (e: KaraLineType) => {
    const duration = e.endTime - e.startTime
    const currentDuration = currentTime * 1000 - e.startTime
    return currentDuration / duration * 100
  }

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
      <div className='relative w-max'>
        <div id='kara-line1' className='h-[5rem]'>{line1Data.data}</div>
        {
          inTimeLine(line1Data) &&
          <div className='kara-runner absolute h-full top-0 left-0 text-amber-400'>
            <div 
              className='w-0 h-full overflow-hidden whitespace-nowrap transition-all' 
              style={{width: `${getPercentageDuration(line1Data)}%`}}>
              {line1Data.data}
            </div>
          </div>
        }
      </div>
      <div className='relative w-max'>
        <div id='kara-line2' className='h-[5rem]'>{line2Data.data}</div>
        {
          inTimeLine(line2Data) &&
          <div className='kara-runner absolute h-full top-0 left-0 text-amber-400'>
            <div 
              className='w-0 h-full overflow-hidden whitespace-nowrap transition-all' 
              style={{width: `${getPercentageDuration(line2Data)}%`}}>
              {line2Data.data}
            </div>
          </div>
        }
      </div>
    </section>
  )
}

export default Karaoke
