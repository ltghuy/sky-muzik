import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailArtist } from '../api/artist'
import { ArtistProps } from '../types/common'
import MainLayout from '../containers/MainLayout'
import Loading from '../components/Loading'

const ArtistPage: React.FC = () => {
  const params = useParams<{artistID: string}>()
  const [dataDetailArtist, setDataDetailArtist] = useState<ArtistProps>()

  useEffect(() => {
    (
      async () => {
        if (params.artistID) {
          const detailPlayList = await getDetailArtist(params.artistID)
          setDataDetailArtist(detailPlayList)
        }
      }
    )()
  }, [params])

  return (
    <MainLayout>
      <div className="banner-wrapper w-full h-[410px] -mt-[var(--header-height)] relative">
        {
          dataDetailArtist?.cover !== undefined ? (
            <div 
              className="banner w-full h-full brightness-75"
              style={{background: `url('${dataDetailArtist?.cover}')`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
            </div>
          ) : <Loading />
        }
      </div>
    </MainLayout>
  )
}

export default ArtistPage
