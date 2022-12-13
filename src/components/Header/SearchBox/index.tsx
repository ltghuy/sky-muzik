import React from 'react'
import { ReactComponent as SearchIcon } from '../../../static/icons/search-icon.svg'

const SearchBox: React.FC = () => {
  return (
    <div className='search-box w-[400px] h-10'>
      <form action="post" className='search-form w-full h-full flex px-3 border border-slate-300 rounded-bl-2xl rounded-tr-2xl focus-within:border-slate-400'>
        <div className="search-icon w-5 flex-shrink-0 flex justify-center items-center mr-2">
          <SearchIcon className='w-[14px]' />
        </div>
        <input 
        type="search" 
        placeholder='Tìm kiếm bài hát, nghệ sĩ...' 
        className='flex-1 h-full border-0 outline-none bg-transparent text-sm' />
      </form>
    </div>
  )
}

export default SearchBox
