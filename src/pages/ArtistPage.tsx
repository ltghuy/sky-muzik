import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailArtist } from '../api/artist'
import { ArtistProps } from '../types/common'
import MainLayout from '../containers/MainLayout'
import Playlist from '../containers/PlayList'
import Loading from '../components/Loading'
import Song from '../components/Song.tsx'

const ArtistPage: React.FC = () => {
  const params = useParams<{ artistID: string }>()
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
      <div className="banner-wrapper w-full h-[410px] relative">
        {
          dataDetailArtist !== undefined ? (
            <div
              className="banner w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url('${dataDetailArtist?.cover}')` }}>
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
        <section className="best-song mt-5 min-h-[30vh] rounded-2xl relative">
          {
            dataDetailArtist?.sections ?
            dataDetailArtist.sections.filter((section: any) => section.sectionType === 'song')
            .map((e: any) => (
              <div key={e.title}>
                <h3 className="heading text-xl text-black dark:text-white font-bold">
                  {e.title}
                </h3>
                <div className="best-song-list h-max w-full">
                  <div className="search-wrapper h-full  grid grid-cols-2 gap-x-16 gap-y-4">
                    {
                      // Only get max 6 songs
                      e.items.slice(0, 6)
                      .map((item: any, index: number) => (
                        <Song 
                          key={index}
                          index={index}
                          thumbnail={item?.thumbnail}
                          title={item?.title}
                          encodeId={item?.encodeId}
                          duration={item?.duration}
                          streamingStatus={item?.streamingStatus}
                          artists={item?.artists}
                          artistsNames={item?.artistsNames}
                          album={item?.album}
                        />
                      ))
                    }
                  </div>
                </div>
              </div>
            )) 
            : <Loading />
          }
        </section>
        <section className="artist-playlist mt-5 min-h-[30vh] rounded-2xl relative">
        {
            dataDetailArtist?.sections ?
            dataDetailArtist.sections.filter((section: any) => section.sectionType === 'playlist')
            .map((e: any, index: number) => (
              <Playlist
                key={index}
                title={e.title}
                sectionId={e.sectionId}
                link={e.link}
                playList={e.items}
              />
            )) 
            : <Loading />
          }
        </section>
        <section className="artist-biography w-full mt-5">
          {
            dataDetailArtist?.name &&
            <h3 className="heading text-xl text-black dark:text-white font-bold">
              {`Về ${dataDetailArtist?.name}`}
            </h3>
          }
          <div className="flex justify-between items-start gap-10 pt-5">
            <div className="artist-thumbnail w-[40%] flex-shrink-0 min-h-[350px] h-[350px] rounded-2xl relative">
              {
                dataDetailArtist?.thumbnailM !== undefined ?
                  (
                    <img
                      src={dataDetailArtist.thumbnailM}
                      alt={dataDetailArtist.name}
                      className='absolut w-full h-full object-cover object-center rounded-2xl' />
                  ) : <Loading />
              }
            </div>
            <div className="artist-bio pr-60 flex-1 min-h-[350px] h-[350px] rounded-2xl relative">
              {
                dataDetailArtist?.biography !== undefined ?
                  (
                    <>
                      <div
                        className='text-[color:var(--body-text)] dark:text-neutral-500 text-sm pr-5 max-h-[200px] overflow-y-scroll'
                        dangerouslySetInnerHTML={{ __html: dataDetailArtist?.biography }} />
                      <div className="sub-bio flex pt-5">
                        <div className="following font-inter">
                          <h4 className='font-bold text-xl text-[color:var(--primary)] pb-1'>
                            {`${new Intl.NumberFormat().format(dataDetailArtist?.totalFollow)}`}
                          </h4>
                          <p className='text-black dark:text-white opacity-30 text-sm font-bold'>Người quan tâm</p>
                        </div>
                        {
                          dataDetailArtist.awards !== undefined && (
                            <div className="award font-inter ml-12">
                              <h4 className='font-bold text-xl text-[color:var(--primary)] pb-1'>
                                {dataDetailArtist?.awards.length}
                              </h4>
                              <p className='text-black dark:text-white opacity-30 text-sm font-bold'>Giải thưởng</p>
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
