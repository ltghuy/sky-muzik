import React from 'react'

const Timeline: React.FC = () => {
  return (
    <div className='player-timeline flex justify-between items-center text-[color:var(--white)] px-1'>
      <span className='time-start text-xs font-bold min-w-[45px] flex-shrink-0 opacity-50 text-right mr-3'>
        03:01
      </span>
      <span className='time-duration flex-1 h-[3px] hover:h-[6px] bg-white bg-opacity-50 rounded-2xl transition cursor-pointer relative'>

      </span>
      <span className='time-end text-xs font-bold min-w-[45px] flex-shrink-0 opacity-50 text-left ml-3'>
        03:59
      </span>
    </div>
  )
}

export default Timeline
