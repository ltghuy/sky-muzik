import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCharts } from '../../../api/charts'
import { useQuery } from 'react-query'
import useOnClickOutside from '../../../hooks/useOnClickOutSide'
import { ReactComponent as SearchIcon } from '../../../static/icons/search-icon.svg'
import { ReactComponent as MicroIcon } from '../../../static/icons/micro-icon.svg'

const SearchBox: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false)
  const searchboxRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleChange = (e: any) => {
    setKeyword(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    navigate(`/search/${e.target[0].value}`)
  }

  const handleFocus = () => {
    setIsInputFocus(true)
  }

  const handleSearch = (keyword: string) => {
    navigate(`/search/${keyword}`)
  }

  useOnClickOutside(searchboxRef, () => setIsInputFocus(false))

  const recommendQuery: any = useQuery('recommendSong', getCharts, { staleTime: 60000 })

  return (
    <div className='search-box w-[400px] h-10 relative'>
      <div 
        ref={searchboxRef}
        className={`search-wrapper flex flex-col items-start ${isInputFocus ? 'h-56 bg-[color:var(--primary-light)] rounded-2xl' : 'h-full'}`}
        >
        <form
          method='GET'
          onSubmit={handleSubmit}
          className={`search-form w-full h-10 flex px-3 border ${isInputFocus ? 'border-none' : 'border-slate-300 rounded-bl-2xl rounded-tr-2xl focus-within:border-[color:var(--primary)]'} bg-transparent`}>
          <div className="search-icon text-[color:var(--primary)] dark:text-white w-5 flex-shrink-0 flex justify-center items-center mr-2">
            <SearchIcon className='w-[14px]' />
          </div>
          <input
            type="search"
            value={keyword}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder='Tìm kiếm bài hát, nghệ sĩ...'
            className='flex-1 h-full border-0 outline-none bg-transparent text-sm text-[color:var(--primary)] dark:text-white placeholder-gray-800 dark:placeholder-white focus-within:placeholder-[color:var(--primary)]'
          />
        </form>
        <div className={`recommend-list w-full px-2 ${(isInputFocus && recommendQuery.data) ? 'block' : 'hidden'}`}>
          <h3 className='recomment-title font-inter font-bold text-sm text-white pl-2 pb-2'>Đề xuất cho bạn</h3>
          <ul className='space-y-1 text-xs text-white opacity-80'>
            {
              recommendQuery.data?.newRelease.slice(0, 4)
              .map((item: any, index: number) => 
              <li 
                className='w-full text-white hover:bg-violet-300 rounded py-2 pl-5 flex cursor-pointer' key={index}
                onClick={() => handleSearch(item.title)}
              >
                <span className='mr-2'>
                  <MicroIcon className='w-4' />
                </span>
                <span>{item.title}</span>
              </li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchBox
