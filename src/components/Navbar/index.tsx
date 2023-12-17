import { ReactComponent as HomeIcon } from '@static/icons/home-icon.svg'
import { ReactComponent as MenuIcon } from '@static/icons/menu-icon.svg'
import { ReactComponent as MusicIcon } from '@static/icons/music-icon.svg'
import { ReactComponent as MVIcon } from '@static/icons/mv-icon.svg'
import { ReactComponent as Top100 } from '@static/icons/top-100-icon.svg'
import logo from '@static/images/sky.gif'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.scss'

const Navbar: React.FC = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  const navbarRef = useRef<any>(null)

  const handleSidebar = () => {
    setToggleSidebar((toggleSidebar) => !toggleSidebar)
  }

  const checkNavbarToggle = () => {
    if (navbarRef && navbarRef.current && !toggleSidebar) {
      navbarRef.current.classList.add('is-hidden')
      document.documentElement.style.setProperty('--sidebar-width', '80px')
    }
    else {
      navbarRef.current.classList.remove('is-hidden')
      document.documentElement.style.setProperty('--sidebar-width', '260px')
    }
  }

  useEffect(() => {
    checkNavbarToggle()
  }, [toggleSidebar])

  return (
    <section className='navbar w-14 md:w-[var(--sidebar-width)] fixed left-0 top-0 bottom-[var(--player-height)] bg-white dark:bg-[color:var(--primary-sidebar)] shadow transition-all ease-in-out duration-150 z-20' ref={navbarRef} >
      <div className="navbar-wrapper py-4">
        <div className="navbar-logo hidden md:flex items-center justify-between px-3 text-[color:var(--primary)] dark:text-white">
          <NavLink to={'/'} className='item-toggle flex items-center' >
            <img
              className='h-12'
              src={logo}
              alt="Sky muzik logo" />
            <h3 className='font-semibold text-lg ml-1'>skyMuzik</h3>
          </NavLink>
          <MenuIcon className='cursor-pointer' onClick={handleSidebar} />
        </div>
        <ul className="navbar-list md:mt-10 pl-5 dark:text-white">
          <li className='navbar-item mb-8'>
            <NavLink
              to='/'
              className='flex items-center hover:text-[color:var(--primary)] py-2 transition-all'
              style={({ isActive }) => isActive ? { color: "var(--primary)", borderRight: "3px solid currentColor" } : { borderRight: "3px solid transparent" }}>
              <HomeIcon className='w-[20px] h-[20px] fill-current' />
              <span className='item-toggle pl-3'>Trang chủ</span>
            </NavLink>
          </li>
          <li className='navbar-item mb-8'>
            <NavLink
              to='/charts'
              className='flex items-center hover:text-[color:var(--primary)] py-2 transition-all'
              style={({ isActive }) => isActive ? { color: "var(--primary)", borderRight: "3px solid currentColor" } : { borderRight: "3px solid transparent" }}>
              <MusicIcon className='w-[20px] h-[20px] fill-current' />
              <span className='item-toggle pl-3'>Bảng xếp hạng</span>
            </NavLink>
          </li>
          <li className='navbar-item mb-8'>
            <NavLink
              to='/top100'
              className='flex items-center hover:text-[color:var(--primary)] py-2 transition-all'
              style={({ isActive }) => isActive ? { color: "var(--primary)", borderRight: "3px solid currentColor" } : { borderRight: "3px solid transparent" }}>
              <Top100 className='w-[20px] h-[20px] fill-current' />
              <span className='item-toggle pl-3'>Top 100</span>
            </NavLink>
          </li>
          <li className='navbar-item mb-8'>
            <NavLink
              to='/mv'
              className='flex items-center hover:text-[color:var(--primary)] py-2 transition-all'
              style={({ isActive }) => isActive ? { color: "var(--primary)", borderRight: "3px solid currentColor" } : { borderRight: "3px solid transparent" }}>
              <MVIcon className='w-[20px] h-[20px] fill-current' />
              <span className='item-toggle pl-3'>MV</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Navbar
