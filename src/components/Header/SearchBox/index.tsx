import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as SearchIcon } from '../../../static/icons/search-icon.svg'

const SearchBox: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const navigate = useNavigate()

  const handleChange = (e: any) => {
    setKeyword(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    navigate(`/search/${e.target[0].value}`)
  }

  return (
    <div className='search-box w-[400px] h-10'>
      <form 
        method='GET'
        onSubmit={handleSubmit}
        className='search-form w-full h-full flex px-3 border border-slate-300 rounded-bl-2xl rounded-tr-2xl focus-within:border-[color:var(--primary)] bg-white bg-opacity-10'>
        <div className="search-icon text-[color:var(--primary)] w-5 flex-shrink-0 flex justify-center items-center mr-2">
          <SearchIcon className='w-[14px]' />
        </div>
        <input 
        type="search" 
        value={keyword}
        onChange={handleChange}
        placeholder='Tìm kiếm bài hát, nghệ sĩ...' 
        className='flex-1 h-full border-0 outline-none bg-transparent text-sm text-[color:var(--primary)] placeholder-gray-800 focus-within:placeholder-[color:var(--primary)]' />
      </form>
    </div>
  )
}

export default SearchBox
