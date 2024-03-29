import SearchBox from '@components/Header/SearchBox'
import useDarkMode from '@hooks/core/useDarkMode'
import { ReactComponent as ArrowIcon } from '@static/icons/arrow-icon.svg'
import { ReactComponent as MessageIcon } from '@static/icons/message-icon.svg'
import { ReactComponent as MoonIcon } from '@static/icons/moon-icon.svg'
import { ReactComponent as NotificationIcon } from '@static/icons/notification-icon.svg'
import { ReactComponent as SunIcon } from '@static/icons/sun-icon.svg'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const headerRef = useRef<HTMLElement>(null)
  const [stickyClass, setStickyClass] = useState<string>('bg-none')

  useEffect(() => {
    const wrapper = document.querySelector('.main-content') as HTMLElement

    const isSticky = (e: any) => {
      if (headerRef.current) {
        wrapper.scrollTop >= 1 ? setStickyClass('bg-white dark:bg-[color:var(--primary-darker)]') : setStickyClass('bg-none')
      }
    }

    wrapper.addEventListener('scroll', isSticky)
    return () => {
      wrapper.removeEventListener('scroll', isSticky)
    }
  }, [])

  return (
    <section className={`header fixed top-0 right-0 left-14 md:left-[var(--sidebar-width)] h-[var(--header-height)] z-10 ${stickyClass}`} ref={headerRef}>
      <div className="header-container px-4 md:px-8 h-full flex items-center justify-between">
        <div className="header-left flex items-center sm:max-w-[450px] flex-1">
          <div className='hidden sm:flex items-center'>
            <button className='hover:text-[color:var(--primary)] dark:text-white transition' onClick={() => navigate(-1)}>
              <ArrowIcon className='w-[20px] -rotate-90' />
            </button>
            <button className='hover:text-[color:var(--primary)] dark:text-white transition mx-5' onClick={() => navigate(+1)}>
              <ArrowIcon className='w-[20px] rotate-90' />
            </button>
          </div>
          <SearchBox />
        </div>
        <ul className="header-right hidden md:flex items-center space-x-3 ml-3 flex-shrink-0">
          <li>
            <button
              className={'w-20 h-8 rounded-2xl border-slate-300 dark:border-gray-500 border shadow-sm py-1 px-2 flex justify-center items-center relative ' + (isDarkMode === 'dark' ? 'bg-transparent' : 'bg-white')}
              onClick={toggleDarkMode}>
              <span className={"sun text-amber-500 flex-1 " + (isDarkMode === 'dark' ? 'hidden' : 'block')}>
                <SunIcon className='w-6' />
              </span>
              <span className={'circle flex-shrink-0 w-5 h-5 border-[3px] rounded-full ' + (isDarkMode === 'dark' ? 'border-gray-500 bg-gray-200' : 'border-amber-500 bg-amber-100')} />
              <span className={"moon text-slate-500 flex-1 " + (isDarkMode === 'dark' ? 'flex justify-end' : 'hidden')}>
                <MoonIcon className='w-4' />
              </span>
            </button>
          </li>
          <li>
            <button className='hover:text-[color:var(--primary)] transition w-8 button-shadow dark:bg-white'>
              <MessageIcon />
            </button>
          </li>
          <li>
            <button className='hover:text-[color:var(--primary)] transition w-8 button-shadow dark:bg-white'>
              <NotificationIcon />
            </button>
          </li>
          <li>
            <button>
              <img
                src="https://api-private.atlassian.com/users/4a5ab89b0c741d737cf666ba8f198042/avatar"
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
