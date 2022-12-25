import React from 'react'
import Loading from '../Loading'
import { ReactComponent as ArrowIcon } from '../../static/icons/slider-arrow.svg'

interface SliderProps {
  data: Array<object>,
  cols: number
}

const Slider: React.FC<SliderProps> = ({ data, cols }) => {

  let box = document.querySelector('.slider-container') as HTMLElement
  let slideItem = document.querySelector('.slider-item') as HTMLElement

  const previousSlide = () => {
    box!.scrollLeft = box?.scrollLeft - slideItem.clientWidth 
  }

  const nextSlide = () => {
    box!.scrollLeft = box?.scrollLeft + slideItem.clientWidth
  }

  return (     
    <section className='slider w-full h-60 relative group'>
      <div className="slider-container w-full h-full flex justify-between items-center overflow-hidden rounded-2xl">
        {
          data?.length > 0 ? 
          data.map((slide: any, index: number) => (
            <a 
            key={index} 
            href='#'
            className={`slider-item h-full bg-slate-200 rounded-3xl flex-shrink-0 scale-95`} 
            style={{width: `calc(100%/${cols})`, background: `url(${slide.banner})`, backgroundSize: 'cover'}}>
            </a>
          ))
          : <Loading />
        }
      </div>
      <div 
        className="slider-arrow previous-arrow left-0 translate-x-4 hidden group-hover:flex" 
        onClick={previousSlide}>
        <ArrowIcon className='w-4' />
      </div>
      <div 
        className="slider-arrow next-arrow right-0 -translate-x-4 scale-[-1] hidden group-hover:flex" 
        onClick={nextSlide} >
        <ArrowIcon className='w-4'/>
      </div>
    </section>
  )
}

export default Slider
