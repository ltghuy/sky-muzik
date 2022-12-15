import React, { useState } from 'react'
import { ReactComponent as VolumnOff } from '../../../../static/icons/volume-off.svg'
import { ReactComponent as VolumnOn } from '../../../../static/icons/volume-on.svg'
import DragBar from '../../DragBar'

const VolumnControl: React.FC = () => {
  const [isVolumnOn, setIsVolumnOn] = useState<boolean>(true)

  const handleTurnVolume = () => {
    setIsVolumnOn(isVolumnOn => !isVolumnOn)
  }

  return (
    <div className='flex items-center'>
      <button
        className='mv-button text-[color:var(--white)] button-hover mr-1 transition'
        onClick={handleTurnVolume}>
        {
          isVolumnOn ? <VolumnOff className='w-5 h-5' /> : <VolumnOn className='w-5 h-5' />
        }
      </button>
      <DragBar />
    </div>
  )
}

export default VolumnControl
