import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as HeartIcon } from '../../../static/icons/heart-icon.svg'
import { ReactComponent as DotstIcon } from '../../../static/icons/triple-dots.svg'

const PlayerLeft:React.FC = () => {
  return (
    <section className='player-left w-[30%] flex items-center justify-start flex-shrink-0 basis-auto'>
      <div className="media-thumnail">
        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
          <Link to={'/'} className='block w-full h-full'>
            <img 
              className='object-cover'
              src="https://a.wattpad.com/useravatar/Jennie1996BLACKPINK.256.577253.jpg" 
              alt="media thumbnail" />
          </Link>
        </div>
      </div>
      <div className="media-info ml-3 font-inter">
        <div className='media-name text-[color:var(--white)] text-sm font-medium'>
          <Link to='/album'>vaicaunoicokhiennguoithaydoi</Link>
        </div>
        <div className='media-artist text-[color:var(--grey-100)] hover:text-[color:var(--primary-light)] hover:underline text-xs leading-5 font-medium'>
          <Link to='/album'>tlinh</Link>
        </div>
      </div>
      <div className="media-controls ml-5">
        <button className='text-[color:var(--white)] p-2 hover:bg-gray-50 hover:bg-opacity-30 rounded-full transition'>
          <HeartIcon />
        </button>
        <button className='text-[color:var(--white)] ml-1 p-2 hover:bg-gray-50 hover:bg-opacity-30 rounded-full transition'>
          <DotstIcon />
        </button>
      </div>
    </section>
  )
}

export default PlayerLeft
