import React, { useEffect, useState } from 'react'
import { KaraLineType } from '../../types/common'
import { useAppSelector } from '../../utils/customRedux'

interface KaraokeProps {
  lyric: KaraLineType[]
}

const Karaoke: React.FC<KaraokeProps> = ({ lyric }) => {
  const currentTime = useAppSelector((state) => state.audio.currentTime)

  const inTimeLine = (e: KaraLineType) => {
    if (e.startTime <= currentTime * 1000 && currentTime * 1000 <= e.endTime) return true
    return false
  }

  return (
    <section className='text-center font-bold space-y-10 py-5 two-line'>
      Coming Soon
    </section>
  )
}

export default Karaoke
