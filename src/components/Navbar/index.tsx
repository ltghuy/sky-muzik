import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as MenuIcon } from '../../static/icons/menu-icon.svg'
import { ReactComponent as HomeIcon } from '../../static/icons/home-icon.svg'
import { ReactComponent as ChartIcon } from '../../static/icons/chart-icon.svg'
import { ReactComponent as Top100 } from '../../static/icons/top-100-icon.svg'
import { ReactComponent as MVIcon } from '../../static/icons/mv-icon.svg'
import logo from '../../static/images/logo.gif'
import './navbar.scss'

const Navbar: React.FC = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true)
  const navbarRef = useRef<any>(null)

  const handleSidebar = () => {
    setToggleSidebar(!toggleSidebar)
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
    <section className='navbar w-[var(--sidebar-width)] fixed left-0 top-0 bottom-[var(--player-height)] bg-[color:var(--white)] shadow transition-all ease-in-out duration-150 z-20' ref={navbarRef} >
      <div className="navbar-wrapper py-4">
        <div className="navbar-logo flex items-center justify-between px-3">
          <NavLink to={'/'} className='item-toggle flex items-center' >
            <img 
              className='h-12'
              src={logo} 
              alt="sky musik logo" />
            <h3 className='text-[color:var(--primary)] font-semibold text-lg ml-1'>skyMuzik</h3>
          </NavLink>
          <MenuIcon className='cursor-pointer' onClick={handleSidebar} />
        </div>
        <ul className="navbar-list mt-10 pl-5">
          <li className='navbar-item mb-8'>
            <NavLink 
              to='/' 
              className='flex items-center hover:text-[color:var(--primary)] py-2 transition-all'
              style={({ isActive }) => isActive ? {color:"var(--primary)", borderRight: "3px solid currentColor"} : {borderRight: "3px solid transparent"} }>
              <HomeIcon className='w-[20px] h-[20px] fill-current' />
              <span className='item-toggle pl-3'>Trang chủ</span>
            </NavLink>
          </li>
          <li className='navbar-item mb-8'>
            <NavLink 
              to='/chart' 
              className='flex items-center hover:text-[color:var(--primary)] py-2 transition-all'
              style={({ isActive }) => isActive ? {color:"var(--primary)", borderRight: "3px solid currentColor"} : {borderRight: "3px solid transparent"} }>
              <ChartIcon className='w-[20px] h-[20px] fill-current' />
              <span className='item-toggle pl-3'>#chart</span>
            </NavLink>
          </li>
          <li className='navbar-item mb-8'>
            <NavLink 
              to='/top100' 
              className='flex items-center hover:text-[color:var(--primary)] py-2 transition-all'
              style={({ isActive }) => isActive ? {color:"var(--primary)", borderRight: "3px solid currentColor"} : {borderRight: "3px solid transparent"} }>
              <Top100 className='w-[20px] h-[20px] fill-current' />
              <span className='item-toggle pl-3'>Top 100</span>
            </NavLink>
          </li>
          <li className='navbar-item mb-8'>
            <NavLink 
              to='/mv' 
              className='flex items-center hover:text-[color:var(--primary)] py-2 transition-all'
              style={({ isActive }) => isActive ? {color:"var(--primary)", borderRight: "3px solid currentColor"} : {borderRight: "3px solid transparent"} }>
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
