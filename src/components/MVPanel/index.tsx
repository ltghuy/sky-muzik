import React, { useState, useEffect } from 'react'
import { useMVStore } from '../../store/useMVStore'
import { MVProps } from '../../types/common'
import { getMVDetail } from '../../api/mv'
import Loading from '../Loading'
import MVHorizontalItem from '../MVItem/horizontal'
import { ReactComponent as CloseIcon } from '../../static/icons/close-icon.svg'

interface MvWithUrl extends MVProps {
  streaming: {
    mp4: {
      '480p': string,
      '720p': string
    }
  }, 
  recommends: []
}

const MVPanel: React.FC = () => {
  const [dataMV, setDataMV] = useState<MvWithUrl | null>(null)
  const { mvID, setMVID, setShowMV } = useMVStore()

  const closeMV = () => {
    setShowMV(false)
    setMVID('')
  }

  useEffect(() => {
    (
      async () => {
        const data: MvWithUrl = await getMVDetail(`${mvID}`)
        setDataMV(data)
      }
    )()
  }, [mvID])

  return (
    <main 
    className={`mv-panel w-full h-screen fixed top-0 left-0 z-[60] overflow-hidden`}
    style={{background: `url(${dataMV?.thumbnailM}) no-repeat center/cover`}}>
      {
        dataMV ? (
          <div className="mv-wrapper w-full h-full flex flex-col bg-black bg-opacity-25 backdrop-blur-3xl relative">
            <div className="mv-top w-full h-20 flex-shrink-0 px-10 flex items-center justify-between">
              <div className="mv-info flex items-center">
                <img className='w-10 h-10 rounded-full object-cover' src={dataMV?.artist.thumbnail} alt={dataMV?.artist.name} />
                <div className="ml-4 font-inter text-white">
                  <div className="mv-name capitalize font-bold text-lg">{dataMV?.title}</div>
                  <div className="mv-artists text-sm leading-4 opacity-50">{dataMV?.artistsNames}</div>
                </div>
              </div>
              <button className="close-mv text-white button-shadow" onClick={closeMV}>
                <CloseIcon className='w-5 h-5' />
              </button>
            </div>
            <div className="mv-bottom w-full flex-1 px-10 pb-10 flex items-stretch justify-between overflow-hidden">
              <div className="mv-player h-full w-[75%] flex-shrink-0">
                <iframe 
                  className='w-full h-full rounded'
                  allowFullScreen 
                  src={dataMV?.streaming.mp4['720p'] || dataMV?.streaming.mp4['480p']}
                >
                </iframe>
              </div>
              <div className="mv-recommends flex-1 flex flex-col ml-10 bg-white bg-opacity-10 rounded">
                <h4 className="text-white text-lg leading-7 font-bold font-inter px-4 pt-4">Danh Sách Phát</h4>
                <div className="mv-list mt-4 overflow-y-scroll hidden-scrollbar">
                  {
                    dataMV.recommends.map((mv: MVProps, index: number) => (
                      <div className="mv-item w-full h-20 hover:bg-white hover:bg-opacity-30 transition py-2 px-4" key={index}>
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
        <Loading darkModeBG='--primary-darker'/>
      }
    </main>
  )
}

export default MVPanel
