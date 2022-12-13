import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className='loading w-full h-full bg-slate-100 flex justify-center items-center relative'>
      <div className="loading-content w-full h-full flex flex-col justify-center gap-5 p-10">
        <div className="w-[20%] h-6 bg-gray-200 opacity-80" />
        <div className="w-[40%] h-6 bg-gray-200 opacity-80" />
        <div className="w-[60%] h-6 bg-gray-200 opacity-80" />
      </div>
      <div className="loading-effect absolute h-full w-full bg-white bg-opacity-30 top-0 left-0 animate-ltr" />
    </div>
  )
}

export default Loading
