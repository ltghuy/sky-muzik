import React from 'react'
import PlayerControls from './Controls'
import Timeline from './Timeline'

const PlayerCenter: React.FC = () => {
  return (
    <section className='player-center flex-grow md:max-w-[40vw] h-full py-2 flex flex-col justify-between'>
      <PlayerControls />
      <Timeline />
    </section>
  )
}

export default PlayerCenter
