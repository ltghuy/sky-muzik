import React from 'react'
import { ReactComponent as ArrowIcon } from '@static/icons/slider-arrow.svg'
import { useNavigate } from 'react-router-dom'
interface SliderProps {
  data: object[] | any,
  cols: number,
}

const Slider: React.FC<SliderProps> = ({ data, cols }) => {
  const navigate = useNavigate()

  const slideEls = document.querySelectorAll('.slider-item') as any
  let curSlide = 0
  let maxSlide = data.length

  const goToSlide = (slide: any) => {
    slideEls.forEach(
      (s: any, i: number) => (s.style.transform = `translateX(${s.clientWidth * (i - slide)}px)`)
    )
  }

  const previousSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - cols
    } else curSlide--
    goToSlide(curSlide)
  }

  const nextSlide = () => {
    if (curSlide === maxSlide - cols) {
      curSlide = 0
    } else curSlide++
    goToSlide(curSlide)
  }

  const handleClick = (encodeID: string) => {
    if (!encodeID) return
    navigate(`/playlist/${encodeID}`)
  }

  return (
    <section className='slider w-full h-full group'>
      <div className="slider-container w-full h-full relative flex overflow-hidden">
        {
          data.map((slide: any, index: number) => (
            <div
              key={index}
              className={`slider-item h-full flex-shrink-0 cursor-pointer absolute top-0 left-0 px-4 transition-all ease-in-out duration-[1500ms]`}
              onClick={() => handleClick(slide.encodeId)}
              style={{ width: `calc(100%/${cols})`, transform: `translateX(calc(100%*${index}))` }}>
              <img
                src={slide.banner}
                alt='banner image'
                className='w-full h-full object-cover rounded-3xl' />
            </div>
          ))
        }
      </div>
      <div
        className="slider-arrow previous-arrow left-0 hidden group-hover:flex"
        onClick={previousSlide}>
        <ArrowIcon className='w-4' />
      </div>
      <div
        className="slider-arrow next-arrow right-0 scale-[-1] hidden group-hover:flex"
        onClick={nextSlide} >
        <ArrowIcon className='w-4' />
      </div>
    </section>
  )
}

export default Slider
