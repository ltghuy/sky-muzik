import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMVList } from '../api/mv'
import { MVProps } from '../types/common'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'
import { ReactComponent as PlayIcon} from '../static/icons/play-icon.svg'

const MVPage: React.FC = () => {
  const [mvList, setMVList] = useState<any>([])

  const splitArr = (originalArr: Array<any>, number: number) => {
    const splittedArray = []
    while (originalArr.length > 0) {
      splittedArray.push(originalArr.splice(0,number))
    }
    return splittedArray
  }

  const playMV = (mvId: string) => {
    console.log('Playin....')
  }

  useEffect(() => {
    (
      async () => {
        const data: {items: []} = await getMVList("IWZ9Z08I", 1, 18)
        setMVList(splitArr(data.items, 3))
      }
    )()
  }, [])

  return (
    <MainLayout>
      <div className="px-8 py-5">
        <div className="mv-wrapper space-y-10 min-h-[500px] relative rounded-2xl">
          {
            mvList.length > 0 ?
            mvList.map((mv: any, index: number) => (
              <div key={index} className="mv-list grid grid-cols-3 gap-x-5">
                {
                  mv.map((e: MVProps) => (
                    <div className="mv-item h-72 flex flex-col" key={e.encodeId}>
                      <div className="mv-top w-full flex-1 overflow-hidden group rounded-2xl cursor-pointer relative">
                        <img 
                          src={e.thumbnailM} 
                          alt={e.title} 
                          className="absolute w-full h-full object-cover group-hover:scale-110 transition-all" />
                          <div className="absolute w-full h-full inset-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center">
                            <button 
                              className='text-white p-3 border border-white rounded-full'
                              onClick={() => playMV(e.encodeId)}>
                              <PlayIcon />
                            </button>
                          </div>
                      </div>
                      <div className="mv-bottom h-14 flex-shrink-0 flex items-center">
                        <div className="artist-avatar w-10 h-10">
                          <Link to={`/artist/${e.artist.alias}`}>
                            <img 
                              className='w-full h-full object-cover rounded-full'
                              src={e.artist.thumbnail} 
                              alt={e.artist.name} />
                          </Link>
                        </div>
                        <div className="mv-description font-inter ml-2">
                          <div className="mv-name" onClick={() => playMV(e.encodeId)}>
                            <span className='text-sm leading-4 font-medium text-[color:var(--black)] hover:text-[color:var(--primary)] cursor-pointer transition'>
                              {e.title}
                            </span>
                          </div>
                          <div className="mv-artists text-xs font-medium text-[color:var(--black)] opacity-50">
                            {e.artistsNames}
                          </div>
                        </div>
                      </div>
                    </div>
                  )) 
                }
              </div>
            )) :
            <Loading />
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default MVPage
