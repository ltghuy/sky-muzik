import React from 'react'
import PlayerLeft from './PlayerLeft'
import PlayerCenter from './PlayerCenter'
import PlayerRight from './PlayerRight'

const Player: React.FC = () => {
  return (
    <section className='player fixed left-0 bottom-0 w-full h-[var(--player-height)] z-50 bg-[color:var(--primary-dark)]'>
      <main className="player-wrapper h-full px-5 flex justify-center items-center">
        <PlayerLeft />
        <PlayerCenter />
        <PlayerRight />
      </main>
    </section>
  )
}

export default Player
