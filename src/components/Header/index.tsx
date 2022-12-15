import React from 'react'
import SearchBox from './SearchBox'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowIcon } from '../../static/icons/arrow-icon.svg'
import { ReactComponent as SettingIcon } from '../../static/icons/setting-icon.svg'
import { ReactComponent as MessageIcon } from '../../static/icons/message-icon.svg'
import { ReactComponent as NotificationIcon } from '../../static/icons/notification-icon.svg'

const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section className='header fixed top-0 right-0 left-[var(--sidebar-width)] h-[var(--header-height)] bg-[color:var(--white)] z-10'>
      <div className="header-container px-8 h-full flex items-center justify-between">
        <div className="header-left flex items-center">
          <button className='hover:text-[color:var(--primary)] transition' onClick={() => navigate(-1)}>
            <ArrowIcon className='w-[20px] -rotate-90' />
          </button>
          <button className='hover:text-[color:var(--primary)] transition mx-5' onClick={() => navigate(+1)}>
            <ArrowIcon className='w-[20px] rotate-90' />
          </button>
          <SearchBox />
        </div>
        <ul className="header-right flex items-center gap-4">
          <li>
            <button className='hover:text-[color:var(--primary)] transition'>
              <SettingIcon className='w-[30px]' />
            </button>
          </li>
          <li>
            <button className='hover:text-[color:var(--primary)] transition'>
              <MessageIcon className='w-[30px]' />
            </button>
          </li>
          <li>
            <button className='hover:text-[color:var(--primary)] transition'>
              <NotificationIcon className='w-[23px]' />
            </button>
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
