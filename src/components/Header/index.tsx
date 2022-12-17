import React, { useEffect, useState } from 'react'
import SearchBox from './SearchBox'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowIcon } from '../../static/icons/arrow-icon.svg'
import { ReactComponent as SettingIcon } from '../../static/icons/setting-icon.svg'
import { ReactComponent as MessageIcon } from '../../static/icons/message-icon.svg'
import { ReactComponent as NotificationIcon } from '../../static/icons/notification-icon.svg'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const [stickyClass, setStickyClass] = useState<string>('bg-none')

  useEffect(() => {
    const wrapper = document.querySelector('.main-wrapper') as HTMLElement

    const isSticky = (e: any) => {
      wrapper.scrollTop >= 100 ? setStickyClass('bg-white') : setStickyClass('bg-none')
    }

    wrapper.addEventListener('scroll', isSticky)
    return () => {
      wrapper.removeEventListener('scroll', isSticky)
    }
  }, [])

  return (
    <section className={`header fixed top-0 right-0 left-[var(--sidebar-width)] h-[var(--header-height)] transition z-10 ${stickyClass}`} >
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
            <button className='hover:text-[color:var(--primary)] transition w-8 button-shadow'>
              <SettingIcon />
            </button>
          </li>
          <li>
            <button className='hover:text-[color:var(--primary)] transition w-8 button-shadow'>
              <MessageIcon />
            </button>
          </li>
          <li>
            <button className='hover:text-[color:var(--primary)] transition w-8 button-shadow'>
              <NotificationIcon />
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
