import React, { useState } from 'react'
import { ReactComponent as MusicListIcon } from '../../../../static/icons/music-list.svg'

const MusicList: React.FC = () => {
  const [isShowList, setIsShowList] = useState<boolean>(false)

  const handleTurnVolume = () => {
    setIsShowList(isShowList => !isShowList)
  }

  return (
    <div className='pl-3 border-l border-l-gray-600'>
      <button
        className='mv-button text-[color:var(--white)] button-hover transition'
        onClick={handleTurnVolume}
        title='Danh sách phát'>
          <MusicListIcon className='w-5 h-5' />
      </button>
    </div>
  )
}

export default MusicList
