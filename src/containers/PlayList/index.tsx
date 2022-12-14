import React from 'react'
import { Link } from 'react-router-dom'
import PlayListItem from '../../components/PlayListItem'
import { ReactComponent as ArrowIcon } from '../../static/icons/arrow-right-icon.svg'

interface PlayListProps {
  title: string,
  sectionId: string,
  link?: string,
  playList: Array<object>
}

const Playlist: React.FC<PlayListProps> = ({ title, sectionId, link, playList}) => {
  return (
    <section className='play-list mb-12 shadow shadow-zinc-50 rounded-2xl'>
      <div className="heading flex justify-between items-center p-5 pb-5 border-b border-gray-200">
        <h3 className='playlist-title uppercase text-lg font-inter font-bold text-[color:var(--black)] dark:text-white'>
          {title || sectionId.slice(1)}
        </h3>
        {
          link &&
          <Link to={link} className='flex text-[color:var(--grey-100)] hover:text-[color:var(--primary)] transition duration-200 group'>
            <span className='text-sm font-medium uppercase'>Tất cả</span>
            <ArrowIcon className='w-2 ml-2 fill-[color:var(--grey-100)] group-hover:fill-[color:var(--primary)]'/>
          </Link>
        }
      </div>
      <div className="content py-10 px-8 grid grid-cols-5 gap-5">
        {
          playList.map((item: any, index: number) => 
            <PlayListItem 
              key={index} 
              encodeId={item.encodeId}
              title={item.title}
              description={item.sortDescription}
              thumbnail={item.thumbnailM}
              artistsNames={item.artistsNames}
              />
          )
        }
      </div>
    </section>
  )
}

export default Playlist
