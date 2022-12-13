import React from 'react'
import SearchBox from './SearchBox'
import { ReactComponent as ArrowIcon } from '../../static/icons/arrow-icon.svg'
import { ReactComponent as SettingIcon } from '../../static/icons/setting-icon.svg'
import { ReactComponent as MessageIcon } from '../../static/icons/message-icon.svg'
import { ReactComponent as NotificationIcon } from '../../static/icons/notification-icon.svg'

const Header: React.FC = () => {
  return (
    <section className='header w-full h-20 bg-indigo-50 bg-opacity-30'>
      <div className="header-container px-8 h-full flex items-center justify-between">
        <div className="header-left flex items-center">
          <ArrowIcon className='cursor-pointer w-[20px] -rotate-90' />
          <ArrowIcon className='cursor-pointer w-[20px] rotate-90 mx-5' />
          <SearchBox />
        </div>
        <ul className="header-right flex items-center gap-4">
          <li>
            <button><SettingIcon className='w-[30px]' /></button>
          </li>
          <li>
            <button><MessageIcon className='w-[30px]' /></button>
          </li>
          <li>
            <button><NotificationIcon className='w-[23px]' /></button>
          </li>
          <li>
            <button>
              <img 
              src="https://styles.redditmedia.com/t5_3fvv4/styles/communityIcon_79r1xyut11q51.jpg" 
              alt="user avatar"
              className='rounded-full w-10 h-10 object-cover' />
            </button>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Header