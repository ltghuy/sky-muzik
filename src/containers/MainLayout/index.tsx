import React from 'react'
import Header from '../../components/Header'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className='main overflow-hidden w-full bg-[var(--white)] fixed top-0 bottom-[var(--player-height)]'>
      <div className='main-wrapper overflow-scroll absolute h-full w-full pl-[var(--sidebar-width)] transition-all delay-300 ease-linear duration-300'>
        <Header />
        <div className='px-8 py-5 mt-[var(--header-height)]'>
          { children}
        </div>
      </div>
    </main>
  )
}

export default MainLayout
