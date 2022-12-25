import React, { useState, useEffect } from 'react'
import { MVProps } from '../types/common'
import { getMVDetail } from '../api/mv'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as CloseIcon } from '../static/icons/close-icon.svg'

const MVDetail: React.FC = () => {
  const [dataMV, setDataMV] = useState<MVProps | null>(null)
  const params = useParams<{ mvID: string }>()
  const navigate = useNavigate()

  const closeMV = () => {
    navigate('/mv')
  }

  useEffect(() => {
    (
      async () => {
        const data: MVProps = await getMVDetail(`${params.mvID}`)
        setDataMV(data)
      }
    )()
  }, [params])

  return (
    <main 
      className='mv-panel w-full h-screen fixed top-0 left-0 z-[60]'
      style={{background: `url(${dataMV?.thumbnailM}) no-repeat center/cover`}}>
      <div className="mv-wrapper w-full h-full bg-black bg-opacity-25 backdrop-blur-3xl relative">
        <div className="mv-top w-full h-20 px-10 flex items-center justify-between">
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
      </div>
    </main>
  )
}

export default MVDetail
