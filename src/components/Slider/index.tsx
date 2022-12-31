import React, { useEffect, useState } from 'react'
import { ReactComponent as ArrowIcon } from '../../static/icons/slider-arrow.svg'
interface SliderProps {
  data: object[],
  cols: number,
  timer?: number
}

const Slider: React.FC<SliderProps> = ({ data, cols, timer = 5000 }) => {

  let box = document.querySelector('.slider-container') as HTMLElement
  let slideItem = document.querySelector('.slider-item') as HTMLElement
  let interval: any = null
  const [sliderContent, setSliderContent] = useState<object[]>([...data, ...data])

  const previousSlide = () => {
    box!.scrollLeft = box?.scrollLeft - slideItem.clientWidth 
  }

  const nextSlide = () => {
    box!.scrollLeft = box?.scrollLeft + slideItem.clientWidth
  }

  const autoSlide = () => {
    if (box && slideItem) {
      const [firstSlide, ...slides] = sliderContent
      setSliderContent([...slides, firstSlide])
      nextSlide()
      console.log('Current ', sliderContent)
    }
  }

  useEffect(() => {
    interval = setInterval(autoSlide, timer)
    return () => {
      clearInterval(interval)
    }
  })

  return (     
    <section className='slider w-full h-full group'>
      <div className="slider-container w-full h-full flex justify-between items-center overflow-hidden">
        {
          sliderContent.map((slide: any, index: number) => (
            <a 
              key={index} 
              href='#'
              className={`slider-item h-full bg-slate-200 rounded-3xl flex-shrink-0 scale-95`} 
              style={{width: `calc(100%/${cols})`, backgroundImage: `url(${slide.banner})`, backgroundSize: 'cover'}}>
            </a>
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
