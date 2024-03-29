import Loading from '@components/Loading'
import MVHorizontalItem from '@components/MVItem/horizontal'
import { useMVDetail } from '@hooks/mv'
import { MVProps } from '@models/common'
import { ReactComponent as CloseIcon } from '@static/icons/close-icon.svg'
import { useMVStore } from '@stores/useMVStore'
import React from 'react'

const MVPanel: React.FC = () => {
  const { mvID, setMVID, setShowMV } = useMVStore()

  const closeMV = () => {
    setShowMV(false)
    setMVID('')
  }

  const { data } = useMVDetail(mvID)

  return (
    <main
      className={`mv-panel w-full h-full fixed top-0 left-0 z-[60] overflow-hidden`}
      style={{ background: `url(${data?.thumbnailM}) no-repeat center/cover` }}>
      {
        data ? (
          <div className="mv-wrapper w-full h-full flex flex-col bg-black bg-opacity-25 backdrop-blur-3xl relative">
            <div className="mv-top w-full h-20 flex-shrink-0 px-2 md:px-10 flex items-center justify-between">
              <div className="mv-info flex items-center">
                <img className='w-10 h-10 rounded-full object-cover' src={data?.artist.thumbnail} alt={data?.artist.name} />
                <div className="ml-4 font-inter text-white">
                  <div className="mv-name capitalize font-bold text-lg one-line">{data?.title}</div>
                  <div className="mv-artists text-sm leading-4 opacity-50">{data?.artistsNames}</div>
                </div>
              </div>
              <button className="close-mv text-white button-shadow" onClick={closeMV}>
                <CloseIcon className='w-5 h-5' />
              </button>
            </div>
            <div className="mv-bottom w-full flex-1 p-4 md:p-10 flex flex-col lg:flex-row items-stretch justify-between overflow-hidden">
              <div className="mv-player h-1/2 lg:h-full w-full lg:w-[70%] flex-shrink-0">
                <iframe
                  className='w-full h-full rounded'
                  allowFullScreen
                  src={data?.streaming.mp4['720p'] ?? data?.streaming.mp4['480p']}
                >
                </iframe>
              </div>
              <div className="mv-recommends h-1/2 lg:h-full flex-1 flex flex-col lg:ml-10 bg-white bg-opacity-10 rounded">
                <h4 className="text-white text-lg leading-7 font-bold font-inter px-4 pt-4">Danh Sách Phát</h4>
                <div className="mv-list mt-4 overflow-y-scroll hidden-scrollbar">
                  {
                    data.recommends.map((mv: MVProps) => (
                      <div
                        className="mv-item-wrapper w-full h-20 md:h-32 lg:h-28 hover:bg-white hover:bg-opacity-30 transition py-2 px-4 mb-4 lg:mb-0"
                        key={mv.title}>
                        <MVHorizontalItem
                          artist={mv.artist}
                          artistsNames={mv.artistsNames}
                          encodeId={mv.encodeId}
                          thumbnailM={mv.thumbnailM}
                          title={mv.title}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        ) :
          <Loading darkModeBG='--primary-darker' />
      }
    </main>
  )
}

export default MVPanel
