import React from 'react'
import { Link } from 'react-router-dom'
import PlayListItem from '@components/PlayListItem'
import { ReactComponent as ArrowIcon } from '@static/icons/arrow-right-icon.svg'
import { PlaylistDetailProps } from '@models/common'

interface PlayListProps {
  title: string,
  sectionId: string,
  link?: string,
  playList: PlaylistDetailProps[]
}

const Playlist: React.FC<PlayListProps> = ({ title, sectionId, link, playList }) => {
  return (
    <section className='play-list mb-8 lg:mb-12 shadow shadow-zinc-50 rounded-2xl'>
      <div className="heading flex justify-between items-center p-3 md:p-5 border-b border-gray-200">
        <h3 className='playlist-title uppercase text-lg font-inter font-bold text-[color:var(--black)] dark:text-white'>
          {title || sectionId.slice(1)}
        </h3>
        {
          link &&
          <Link to={link} className='hidden md:flex text-[color:var(--grey-100)] hover:text-[color:var(--primary)] transition duration-200 group'>
            <span className='text-sm font-medium uppercase'>Tất cả</span>
            <ArrowIcon className='w-2 ml-2 fill-[color:var(--grey-100)] group-hover:fill-[color:var(--primary)]' />
          </Link>
        }
      </div>
      <div className="content my-5 md:py-10 px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 -mx-2">
        {
          playList.map((item: PlaylistDetailProps, index: number) =>
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
