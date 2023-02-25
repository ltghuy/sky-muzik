import React from 'react'
import { ReactComponent as ArrowIcon } from '../../static/icons/slider-arrow.svg'
interface SliderProps {
  data: object[] | any,
  cols: number,
}

const Slider: React.FC<SliderProps> = ({ data, cols }) => {
  let box = document.querySelector('.slider-container') as HTMLElement
  let slideItem = document.querySelector('.slider-item') as HTMLElement

  const previousSlide = () => {
    box!.scrollLeft = box?.scrollLeft - slideItem.clientWidth - 20
  }

  const nextSlide = () => {
    box!.scrollLeft = box?.scrollLeft + slideItem.clientWidth + 20
  }

  const handleClick = () => {
    alert('Tính năng hiện đang được cập nhật!')
  }

  return (     
    <section className='slider w-full h-full group'>
      <div className="slider-container w-full h-full flex justify-between items-center space-x-[20px] overflow-hidden">
        {
          data.map((slide: any, index: number) => (
            <div 
              key={index} 
              className={`slider-item h-full bg-slate-200 rounded-3xl flex-shrink-0 cursor-pointer`} 
              onClick={handleClick}
              style={{width: `calc(100%/${cols})`, backgroundImage: `url(${slide.banner})`, backgroundSize: 'cover'}}>
            </div>
          ))
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
