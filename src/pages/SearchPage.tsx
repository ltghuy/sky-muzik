import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getSearch } from '../api/search'
import { formatFollowing } from '../utils/formatFollow'
import Loading from '../components/Loading'
import MainLayout from '../containers/MainLayout'
import Song from '../components/Song.tsx'

const SearchPage: React.FC = () => {
  const params: any = useParams()
  const [dataSearch, setDataSearch] = useState<any>({})

  useEffect(() => {
    (
      async () => {
        setDataSearch(await getSearch(params.keyword))
      }
    )()
  }, [params])

  return (
    <MainLayout>
      <main className="search-page">
        <section className="search-artists relative min-h-[30vh]">
          {
            dataSearch.artists !== undefined ? (
              <>
                <h3 className='title font-inter text-xl leading-8 font-bold text-[color:var(--black)] py-5'>
                  Nghệ sĩ/OA
                </h3>
                <div className="search-list h-max w-full">
                  <div className="search-wrapper h-full grid grid-cols-5 gap-x-8 gap-y-10 overflow-hidden">
                    {
                      dataSearch.artists.map((item: any, index: number) => (
                        <div className="search-item h-full" key={index}>
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
                              <span className='font-medium text-[color:var(--black)] hover:text-[color:var(--primary)] transition'>
                                {item.name}
                                { item.spotlight && <span>&#128970;</span>}
                              </span>
                            </Link>
                            <p className="totalFollow text-xs font-bold text-[color:var(--black)] opacity-50">
                              {formatFollowing(item.totalFollow)} quan tâm
                            </p>
                          </div>
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
      </main>
    </MainLayout>
  )
}

export default SearchPage
