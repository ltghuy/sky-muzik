import Loading from '@components/Loading'
import MVItem from '@components/MVItem'
import PlayListItem from '@components/PlayListItem'
import Song from '@components/Song'
import { useSearch } from '@hooks/search'
import { formatFollowing } from '@utils/formatFollow'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const SearchPage: React.FC = () => {
  const params = useParams<{ keyword: string }>()
  const { data } = useSearch(params?.keyword ?? '')

  return (
    <main className="search-page">
      {
        data !== undefined ? <>
          <section className="search-artists relative lg:min-h-[30vh]">
            <h3 className='title font-inter text-xl leading-8 font-bold text-black dark:text-white py-5'>
              Nghệ sĩ/OA
            </h3>
            <div className="search-list h-max w-full">
              <div className="search-wrapper h-full flex sm:justify-center sm:flex-wrap gap-4 overflow-x-scroll snap-x hidden-scrollbar">
                {
                  data.artists.slice(0, 5)
                    .map((item: any, index: number) => (
                      <div className="search-item h-full snap-start min-w-[120px] max-w-[150px]" key={index}>
                        <div className="top rounded-full overflow-hidden" title={item.name}>
                          <Link to={`/artist/${item.alias}`}>
                            <img
                              className='hover:scale-110 object-cover transition duration-500 '
                              src={item.thumbnailM}
                              alt={item.name} />
                          </Link>
                        </div>
                        <div className="bottom font-inter text-center pt-5">
                          <Link to={`/artist/${item.alias}`}>
                            <span className='font-medium text-black dark:text-white hover:text-[color:var(--primary)] transition one-line'>
                              {item.name}
                              {item.spotlight && <span>&#128970;</span>}
                            </span>
                          </Link>
                          <p className="totalFollow text-xs font-bold text-black dark:text-white opacity-50">
                            {formatFollowing(item.totalFollow)} quan tâm
                          </p>
                        </div>
                      </div>
                    ))
                }
              </div>
            </div>
          </section>
          <section className="search-list-song relative min-h-[30vh] mt-5">
            {
              data.songs ? (
                <>
                  <h3 className='title font-inter text-xl leading-8 font-bold text-black dark:text-white py-5'>
                    Bài hát
                  </h3>
                  <div className="search-list h-max w-full">
                    <div className="search-wrapper h-full grid grid-cols-1 lg:grid-cols-2 -mx-4">
                      {
                        // Only get max 6 songs
                        data.songs.slice(0, 6)
                          .map((item: any, index: number) => (
                            <div key={index} className='m-2'>
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
                </>
              ) :
                <Loading />
            }
          </section>
          <section className="search-playlists relative lg:min-h-[30vh] mt-5">
            {
              data.playlists ? (
                <>
                  <h3 className='title font-inter text-xl leading-8 font-bold text-black dark:text-white py-5'>
                    Playlist/Album
                  </h3>
                  <div className="search-list h-max w-full">
                    <div className="search-wrapper h-full grid grid-cols-1 md:grid-cols-5 overflow-hidden -mx-2">
                      {
                        // Only get max 5 songs
                        data.playlists.slice(0, 5)
                          .map((item: any, index: number) => (
                            <PlayListItem
                              key={index}
                              encodeId={item.encodeId}
                              title={item.title}
                              description={item.sortDescription}
                              thumbnail={item.thumbnailM}
                              artistsNames={item.artistsNames}
                            />
                          ))
                      }
                    </div>
                  </div>
                </>
              ) :
                <Loading />
            }
          </section>
          <section className="search-video relative lg:min-h-[30vh] mt-5">
            {
              data.videos ? (
                <>
                  <h3 className='title font-inter text-xl leading-8 font-bold text-black dark:text-white py-5'>
                    MV
                  </h3>
                  <div className="search-list h-max w-full">
                    <div className="search-wrapper h-full grid grid-cols-1 md:grid-cols-3 -mx-4 gap-4 overflow-hidden">
                      {
                        // Only get max 3 songs
                        data.videos.slice(0, 3)
                          .map((item: any, index: number) => (
                            <div className="h-72" key={index}>
                              <MVItem
                                artist={item.artist}
                                artistsNames={item.artistsNames}
                                encodeId={item.encodeId}
                                thumbnailM={item.thumbnailM}
                                title={item.title}
                              />
                            </div>
                          ))
                      }
                    </div>
                  </div>
                </>
              ) :
                <Loading />
            }
          </section>
        </> : <Loading />}
    </main>
  )
}

export default SearchPage
