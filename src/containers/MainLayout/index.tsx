import React from 'react'
import Header from '../../components/Header'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className='main overflow-hidden w-full bg-white dark:bg-[color:var(--primary-dark)] fixed top-0 bottom-[var(--player-height)]'>
      <div className='main-wrapper absolute h-full w-full pl-[var(--sidebar-width)] transition-all delay-300 ease-linear duration-300'>
        <Header />
        <div className='main-content mt-[var(--header-height)] h-[calc(100%-var(--player-height))] overflow-y-scroll'>
          { children}
        </div>
      </div>
    </main>
  )
}

export default MainLayout
