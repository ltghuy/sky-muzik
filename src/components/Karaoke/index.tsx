import React, { useEffect, useState } from 'react'
import { KaraLineType } from '../../types/common'
import { useAppSelector } from '../../utils/customRedux'

interface KaraokeProps {
  lyric: KaraLineType[]
}

const Karaoke: React.FC<KaraokeProps> = ({ lyric }) => {
  const currentTime = useAppSelector((state) => state.audio.currentTime)
  const [index, setIndex] = useState<number>(0)

  const inTimeLine = (e: KaraLineType) => {
    if (e.startTime <= currentTime * 1000 && currentTime * 1000 <= e.endTime) return true
    return false
  }

  const handleChangeLine = () => {
    lyric.map((e: KaraLineType, index: number) => {
      const line1 = document.querySelector('#kara-line1') as HTMLDivElement
      const line2 = document.querySelector('#kara-line2') as HTMLDivElement

      if (inTimeLine(e) && index % 2 === 0 && document) {
        line2.innerHTML = lyric[index + 1].data
        line2.classList.add('animate-fadeIn')
        line1.classList.remove('animate-fadeIn')
      }
      if (inTimeLine(e) && index % 2 !== 0 && document) {
        line1.innerHTML = lyric[index + 1].data
        line1.classList.add('animate-fadeIn')
        line2.classList.remove('animate-fadeIn')
      }
    })
  }

  useEffect(() => {
    handleChangeLine()
  }, [currentTime])

  return (
    <section className='text-center font-bold space-y-5 select-none'>
      <div id='kara-line1'>{lyric[index].data}</div>
      <div id='kara-line2'>{lyric[index + 1].data}</div>
    </section>
  )
}

export default Karaoke
