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
          dataDetailArtist !== undefined ? (
            <div 
              className="banner w-full h-full relative"
              style={{background: `url('${dataDetailArtist?.cover}')`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                <div className="banner-content absolute bg-black bg-opacity-30 w-full h-full px-16 py-8 font-inter flex flex-col justify-end">
                  <h2 className='artist-name text-white text-6xl font-bold'>{dataDetailArtist?.name}</h2>
                  <p className='text-base font-medium text-white mt-8 opacity-75'>
                    {`${new Intl.NumberFormat().format(dataDetailArtist?.totalFollow)} người quan tâm`}
                  </p>
                </div>
            </div>
          ) : <Loading />
        }
      </div>
      <main className='px-8 py-5 font-inter'>
        <section className="artist-biography w-full mt-5 h-[240px] relative">
          {
            dataDetailArtist?.name && 
            <h3 className="heading text-xl text-[color:var(--black)] font-bold">
              {`Về ${dataDetailArtist?.name}`}
            </h3>
          }
          <div className="flex justify-between items-start gap-10 pt-5">
            <div className="artist-thumbnail w-[40%] flex-shrink-0 min-h-[300px] h-[300px] relative">
              {
                dataDetailArtist?.thumbnailM !== undefined ?
                (
                  <img 
                  src={dataDetailArtist.thumbnailM} 
                  alt={dataDetailArtist.name} 
                  className='absolut w-full h-full object-cover rounded-2xl' />
                ) : <Loading />
              }
            </div>
            <div className="artist-bio pr-60 flex-1 min-h-[300px] h-[300px] relative">
              {
                dataDetailArtist?.biography !== undefined ?
                (
                  <>
                    <div
                    className='text-[color:var(--body-text)] text-sm pr-5 eight-line'
                    dangerouslySetInnerHTML={{__html: dataDetailArtist?.biography}} />
                    <div className="sub-bio flex pt-5">
                      <div className="following font-inter">
                        <h4 className='font-bold text-xl text-[color:var(--primary)] pb-1'>
                          {`${new Intl.NumberFormat().format(dataDetailArtist?.totalFollow)}`}
                        </h4>
                        <p className='text-[color:var(--black)] opacity-30 text-sm font-bold'>Người quan tâm</p>
                      </div>
                      {
                        dataDetailArtist.awards !== undefined &&  (
                          <div className="award font-inter ml-12">
                            <h4 className='font-bold text-xl text-[color:var(--primary)] pb-1'>
                              { dataDetailArtist?.awards.length }
                            </h4>
                            <p className='text-[color:var(--black)] opacity-30 text-sm font-bold'>Giải thưởng</p>
                          </div>
                        )
                      }
                    </div>
                  </>
                ) : <Loading />
              }
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  )
}

export default ArtistPage
