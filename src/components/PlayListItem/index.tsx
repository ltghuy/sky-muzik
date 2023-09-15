import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as HeartIcon } from '@static/icons/heart-icon.svg'
import { ReactComponent as PlayIcon } from '@static/icons/play-icon.svg'
import { ReactComponent as DotsIcon } from '@static/icons/triple-dots.svg'

interface ItemProps {
  encodeId: string,
  title: string,
  description: string
  thumbnail: string,
  artistsNames: string
}

const addToLikeList = (e: any) => {
  e.preventDefault()
  console.log('Add to like list')
}

const playPlayList = (e: any) => {
  e.preventDefault()
  console.log('Play playlist')
}

const openOption = (e: any) => {
  e.preventDefault()
  console.log('Open options modal')
}

const PlayListItem: React.FC<ItemProps> = ({ encodeId, title, description, thumbnail, artistsNames }) => {
  return (
    <div className="playlist-item col-span-1 mx-2 my-4">
      <div className="item-top cursor-pointer overflow-hidden rounded-bl-3xl rounded-tr-3xl group relative">
        <img src={thumbnail} alt={description} className='lg:group-hover:scale-110 transform duration-300' />
        <Link to={`/playlist/${encodeId}`} title={title}>
          <div className="overlay absolute w-full h-full top-0 left-0 text-white bg-black bg-opacity-40 hidden group-hover:flex justify-center items-center">
            <button className='p-2 rounded-full hover:bg-slate-50 hover:bg-opacity-20'>
              <HeartIcon onClick={addToLikeList} />
            </button>
            <button className='p-3 mx-2 rounded-full border border-white'>
              <PlayIcon onClick={playPlayList} />
            </button>
            <button className='p-2 rounded-full hover:bg-slate-50 hover:bg-opacity-20'>
              <DotsIcon onClick={openOption} />
            </button>
          </div>
        </Link>
      </div>
      <div className="item-bottom font-inter">
        <Link to={`/playlist/${encodeId}`}>
          <h3 className='text-sm font-bold one-line pt-3 text-black dark:text-white hover:text-[color:var(--primary)] transition' title={title}>
            {title}
          </h3>
        </Link>
        <p className='description dark:text-white one-line font-normal text-sm opacity-75'>
          {artistsNames || description}
        </p>
      </div>
    </div>
  )
}

export default PlayListItem
