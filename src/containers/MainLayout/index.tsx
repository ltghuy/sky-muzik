import Header from '@components/Header';
import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';


const MainLayout = () => {
  const location = useLocation()
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollContainer.current?.scrollTo({
      top: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [location]);

  return (
    <main className='main overflow-hidden w-full bg-white dark:bg-[color:var(--primary-dark)] fixed top-0 bottom-[var(--player-height)]'>
      <div className='main-wrapper absolute h-full w-full pl-14 md:pl-[var(--sidebar-width)] transition-all delay-300 ease-linear duration-300'>
        <Header />
        <div ref={scrollContainer} className='main-content h-full overflow-y-scroll'>
          <div className="page-content">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainLayout
