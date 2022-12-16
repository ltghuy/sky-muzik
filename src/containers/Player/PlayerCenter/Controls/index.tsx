import React from 'react'
import NextControl from './nextControl'
import PlayControl from './playControl'
import PreviousControl from './previousControl'
import RepeatControl from './repeatControl'
import ShuffleControl from './shuffleControl'

const PlayerControls: React.FC = ({}) => {
  return (
    <div className='player-controls text-white flex justify-center items-center gap-5'>
      <ShuffleControl />
      <PreviousControl />
      <PlayControl />
      <NextControl />
      <RepeatControl />
    </div>
  )
}

export default PlayerControls
