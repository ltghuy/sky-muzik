import React from 'react'

interface LoadingProps {
  darkModeBG?: string
}

const Loading: React.FC<LoadingProps> = ({ darkModeBG }) => {
  return (
    <div className={`loading w-full h-full bg-slate-100 ${darkModeBG ? `dark:bg-[color:var(${darkModeBG})]` : 'dark:bg-[#75696e1a]'} flex justify-center items-center absolute rounded-[inherit] z-[70]`}>
      <div className="loading-content w-full h-full flex flex-col justify-center gap-5 p-10">
        <div className="w-[20%] h-6 bg-gray-200 dark:bg-[#e9cad317] opacity-80" />
        <div className="w-[40%] h-6 bg-gray-200 dark:bg-[#e9cad317] opacity-80" />
        <div className="w-[60%] h-6 bg-gray-200 dark:bg-[#e9cad317] opacity-80" />
      </div>
    </div>
  )
}

export default Loading
