import React from 'react'
import LyricControl from './LyricControl'
import MVControl from './MV'
import MusicList from './MusicList'
import VolumeControl from './Volume'

const PlayerRight: React.FC = () => {
  return (
    <section className='player-right w-[30%] hidden md:flex items-center justify-end space-x-3 flex-shrink-0 basis-auto'>
      <MVControl />
      <LyricControl />
      <VolumeControl />
      <MusicList />
    </section>
  )
}

export default PlayerRight
