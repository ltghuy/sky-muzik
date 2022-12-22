import React from 'react'
import LyricControl from './LyricControl'
import MusicList from './MusicList'
import MVControl from './MV'
import VolumnControl from './Volumn'

const PlayerRight:React.FC = () => {
  return (
    <section className='player-right w-[30%] flex items-center justify-end gap-3 flex-shrink-0 basis-auto'>
      <MVControl />
      <LyricControl />
      <VolumnControl />
      <MusicList />
    </section>
  )
}

export default PlayerRight
