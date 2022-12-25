import React, { useState, useEffect } from 'react'
import { MVProps } from '../types/common'
import { getMVDetail } from '../api/mv'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as CloseIcon } from '../static/icons/close-icon.svg'

interface MvWithUrl extends MVProps {
  streaming: {
    mp4: {
      '480p': string,
      '720p': string
    }
  }
}

const MVDetail: React.FC = () => {
  const [dataMV, setDataMV] = useState<MvWithUrl | null>(null)
  const params = useParams<{ mvID: string }>()
  const navigate = useNavigate()

  const closeMV = () => {
    navigate('/mv')
  }

  useEffect(() => {
    (
      async () => {
        const data: MvWithUrl = await getMVDetail(`${params.mvID}`)
        setDataMV(data)
      }
    )()
  }, [params])

  return (
    <main 
      className='mv-panel w-full h-screen fixed top-0 left-0 z-[60]'
      style={{background: `url(${dataMV?.thumbnailM}) no-repeat center/cover`}}>
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
        <div className="mv-bottom w-full flex-1 px-10 pb-10 flex items-stretch justify-between">
          <div className="mv-player h-full w-[75%] flex-shrink-0">
            <iframe 
            className='w-full h-full'
            allowFullScreen 
            src={dataMV?.streaming.mp4['720p'] || dataMV?.streaming.mp4['480p']}>
            </iframe>
          </div>
          <div className="mv-list flex-1 ml-10 bg-white bg-opacity-10"></div>
        </div>
      </div>
    </main>
  )
}

export default MVDetail
