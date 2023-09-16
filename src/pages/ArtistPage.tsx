import React from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '@containers/MainLayout'
import Playlist from '@containers/PlayList'
import Loading from '@components/Loading'
import Song from '@components/Song'
import { useArtist } from '@hooks/artist'

const ArtistPage: React.FC = () => {
  const params = useParams<{ artistID: string }>()
  const { data } = useArtist(params.artistID ?? '')
  return (
    <MainLayout>
      <div className="banner-wrapper w-full h-[410px] relative">
        {
          data ? (
            <div
              className="banner w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url('${data.cover}')` }}>
              <div className="banner-content absolute bg-black bg-opacity-30 w-full h-full px-16 py-8 font-inter flex flex-col justify-end">
                <h2 className='artist-name text-white text-6xl font-bold'>{data.name}</h2>
                <p className='text-base font-medium text-white mt-8 opacity-75'>
                  {`${new Intl.NumberFormat().format(data.totalFollow)} người quan tâm`}
                </p>
              </div>
            </div>
          ) : <Loading />
        }
      </div>
      <main className='px-8 py-5 font-inter'>
        <section className="best-song mt-5 lg:min-h-[30vh] rounded-2xl relative">
          {
            data?.sections ?
              data.sections.filter((section: any) => section.sectionType === 'song')
                .map((e: any) => (
                  <div key={e.title}>
                    <h3 className="heading text-xl text-black dark:text-white font-bold">
                      {e.title}
                    </h3>
                    <div className="best-song-list h-max w-full">
                      <div className="search-wrapper h-full grid grid-cols-1 lg:grid-cols-2 -mx-4">
                        {
                          // Only get max 6 songs
                          e.items.slice(0, 6)
                            .map((item: any, index: number) => (
                              <div key={index} className='mb-2 mx-4'>
                                <Song
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
                              </div>
                            ))
                        }
                      </div>
                    </div>
                  </div>
                ))
              : <Loading />
          }
        </section>
        <section className="artist-playlist mt-5 lg:min-h-[30vh] rounded-2xl relative">
          {
            data?.sections ?
              data.sections.filter((section: any) => section.sectionType === 'playlist')
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
            data?.name &&
            <h3 className="heading text-xl text-black dark:text-white font-bold">
              {`Về ${data?.name}`}
            </h3>
          }
          <div className="flex justify-between items-start pt-5">
            <div className="artist-thumbnail w-[40%] flex-shrink-0 min-h-[350px] h-[350px] rounded-2xl relative">
              {
                data?.thumbnailM !== undefined ?
                  (
                    <img
                      src={data.thumbnailM}
                      alt={data.name}
                      className='absolut w-full h-full object-cover object-center rounded-2xl' />
                  ) : <Loading />
              }
            </div>
            <div className="artist-bio flex-1 min-h-[350px] h-[350px] ml-10 rounded-2xl relative">
              {
                data?.biography !== undefined ?
                  (
                    <div className='h-full flex flex-col'>
                      <div
                        className='text-[color:var(--body-text)] dark:text-neutral-500 text-sm overflow-y-scroll pr-4'
                        dangerouslySetInnerHTML={{ __html: data?.biography }} />
                      <div className="sub-bio flex pt-5">
                        <div className="following font-inter">
                          <h4 className='font-bold text-xl text-[color:var(--primary)] pb-1'>
                            {`${new Intl.NumberFormat().format(data?.totalFollow)}`}
                          </h4>
                          <p className='text-black dark:text-white opacity-30 text-sm font-bold'>Người quan tâm</p>
                        </div>
                        {
                          data.awards !== undefined && (
                            <div className="award font-inter ml-12">
                              <h4 className='font-bold text-xl text-[color:var(--primary)] pb-1'>
                                {data?.awards.length}
                              </h4>
                              <p className='text-black dark:text-white opacity-30 text-sm font-bold'>Giải thưởng</p>
                            </div>
                          )
                        }
                      </div>
                    </div>
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
