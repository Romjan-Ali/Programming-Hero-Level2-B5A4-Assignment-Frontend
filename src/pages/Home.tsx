import { MoveUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetSomeBooksQuery } from '../redux/api/apiSlice'

interface HomeProps {
  isMenuTriggered: boolean
}

const Home = ({ isMenuTriggered }: HomeProps) => {
  const [textReady, setTextReady] = useState(false)

  const {
    data: randomBooks = [],
    isLoading,
    isError,
  } = useGetSomeBooksQuery({ limit: 6 })

  useEffect(() => {
    if (isMenuTriggered) {
      const timer = setTimeout(() => {
        setTextReady(true)
      }, 20)

      return () => clearTimeout(timer)
    } else {
      setTextReady(false)
    }
  }, [isMenuTriggered])

  if (isLoading) return <div className="p-6 text-center">Loading...</div>
  if (isError || !randomBooks)
    return <div className="p-6 text-center">Error loading book.</div>

  return (
    <>
      {isMenuTriggered ? (
        <div className="text-gray-600">
          <div
            className={`text-gray-600 transition-all duration-1000 transform ${
              textReady ? 'opacity-100 text-white' : 'opacity-0 text-gray-600'
            }`}
          >
            <div>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 my-4 font-bold text-2xl"
              >
                Home{' '}
                <span className="ml-6">
                  <MoveUpRight size={24} />
                </span>{' '}
              </Link>
            </div>
            <div>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 my-4 font-bold text-2xl"
              >
                Browse Books{' '}
                <span className="ml-6">
                  <MoveUpRight size={24} />
                </span>{' '}
              </Link>
            </div>
            <div>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 my-4 font-bold text-2xl"
              >
                Categories{' '}
                <span className="ml-6">
                  <MoveUpRight size={24} />
                </span>{' '}
              </Link>
            </div>
            <div>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 my-4 font-bold text-2xl"
              >
                Authors{' '}
                <span className="ml-6">
                  <MoveUpRight size={24} />
                </span>{' '}
              </Link>
            </div>
            <div>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 my-4 font-bold text-2xl"
              >
                Borrow Summary{' '}
                <span className="ml-6">
                  <MoveUpRight size={24} />
                </span>{' '}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <section
            className="relative w-full h-[450px] md:h-[400px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1588580000645-4562a6d2c839?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50" />

            {/* Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <p className="text-white text-sm md:text-base mb-2">
                Choose Your Book!
              </p>
              <h1 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
                Find Books for <br /> All Ages!
              </h1>
              <Link
                to="#next-book"
                className="mt-6 border-black bg-black text-white px-6 py-3 font-medium hover:bg-[rgb(255,255,255,0.1)] hover:border-white border-2 transition cursor-pointer"
              >
                DISCOVER YOUR NEXT BOOK
              </Link>
            </div>

            {/* Slider Dots */}
            {/* 
            
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              <span className="w-2 h-2 rounded-full bg-white/80" />
              <span className="w-2 h-2 rounded-full bg-lime-500" />
              <span className="w-2 h-2 rounded-full bg-white/80" />
            </div>
            */}
          </section>
          <section id="next-book">
            <h2 className="my-12 text-center text-bold text-4xl">
              Discover Your Next Book
            </h2>
            <div className="grid max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4 max-xl:grid-cols-6 min-xl:grid-cols-6 mx-6 gap-6">
              {randomBooks.map((book) => (
                <Link
                  key={book?._id}
                  to={`/books/${book?._id}`}
                  className="card flex flex-col"
                >
                  <img
                    src={
                      book?.imageUrl
                        ? book?.imageUrl
                        : 'https://www.peeters-leuven.be/covers/no_cover.gif'
                    }
                    alt={book?.title}
                  />
                  <div className="text-xl font-bold text-center ">
                    {book?.title}
                  </div>
                  <div className="text-lg text-center text-fuchsia-700">
                    {book?.author}
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center">
              <Link
                to="/books"
                className="mt-6 border-black bg-black text-white px-6 py-3 font-medium hover:bg-[rgb(255,255,255,0.1)] hover:border-black hover:text-black border-2 transition cursor-pointer"
              >
                DISCOVER MORE BOOKS
              </Link>
            </div>
          </section>
          {/*
          <section className="mt-20">
            <h2 className="my-12 text-center text-bold text-4xl">
              Choose Your Category!
            </h2>
            <div className="grid max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4 max-xl:grid-cols-6 min-xl:grid-cols-6 mx-6 gap-6">
              <Link to="" className="card flex flex-col">
                <div className="relative">
                  <img
                    src="https://booklovers.ancorathemes.com/wp-content/uploads/2021/03/thumb-cat-2-copyright-570x741.jpg"
                    alt=""
                    className="w-full -h-full object-cover"
                  />
                  <div
                    className="absolute z-10 inset-0"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.4) 0px -110px 40px 0px inset',
                    }}
                  >
                    <div className="absolute bottom-0">
                      <div className="text-lg font-bold text-white w-full z-10 px-4">
                        Drama
                      </div>
                      <pre className="text-sm text-center text-white w-full inline-flex items-center z-10 px-4">
                        Shop Now <MoveRight />
                      </pre>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="" className="card flex flex-col">
                <div className="relative">
                  <img
                    src="https://booklovers.ancorathemes.com/wp-content/uploads/2021/03/thumb-cat-2-copyright-570x741.jpg"
                    alt=""
                    className="w-full -h-full object-cover"
                  />
                  <div
                    className="absolute z-10 inset-0"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.4) 0px -110px 40px 0px inset',
                    }}
                  >
                    <div className="absolute bottom-0">
                      <div className="text-lg font-bold text-white w-full z-10 px-4">
                        Drama
                      </div>
                      <pre className="text-sm text-center text-white w-full inline-flex items-center z-10 px-4">
                        Shop Now <MoveRight />
                      </pre>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="" className="card flex flex-col">
                <div className="relative">
                  <img
                    src="https://booklovers.ancorathemes.com/wp-content/uploads/2021/03/thumb-cat-2-copyright-570x741.jpg"
                    alt=""
                    className="w-full -h-full object-cover"
                  />
                  <div
                    className="absolute z-10 inset-0"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.4) 0px -110px 40px 0px inset',
                    }}
                  >
                    <div className="absolute bottom-0">
                      <div className="text-lg font-bold text-white w-full z-10 px-4">
                        Drama
                      </div>
                      <pre className="text-sm text-center text-white w-full inline-flex items-center z-10 px-4">
                        Shop Now <MoveRight />
                      </pre>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="" className="card flex flex-col">
                <div className="relative">
                  <img
                    src="https://booklovers.ancorathemes.com/wp-content/uploads/2021/03/thumb-cat-2-copyright-570x741.jpg"
                    alt=""
                    className="w-full -h-full object-cover"
                  />
                  <div
                    className="absolute z-10 inset-0"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.4) 0px -110px 40px 0px inset',
                    }}
                  >
                    <div className="absolute bottom-0">
                      <div className="text-lg font-bold text-white w-full z-10 px-4">
                        Drama
                      </div>
                      <pre className="text-sm text-center text-white w-full inline-flex items-center z-10 px-4">
                        Shop Now <MoveRight />
                      </pre>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="" className="card flex flex-col">
                <div className="relative">
                  <img
                    src="https://booklovers.ancorathemes.com/wp-content/uploads/2021/03/thumb-cat-2-copyright-570x741.jpg"
                    alt=""
                    className="w-full -h-full object-cover"
                  />
                  <div
                    className="absolute z-10 inset-0"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.4) 0px -110px 40px 0px inset',
                    }}
                  >
                    <div className="absolute bottom-0">
                      <div className="text-lg font-bold text-white w-full z-10 px-4">
                        Drama
                      </div>
                      <pre className="text-sm text-center text-white w-full inline-flex items-center z-10 px-4">
                        Shop Now <MoveRight />
                      </pre>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link
                to=""
                className="mt-6 border-black bg-black text-white px-6 py-3 font-medium hover:bg-[rgb(255,255,255,0.1)] hover:border-black hover:text-black border-2 transition cursor-pointer"
              >
                DISCOVER YOUR CATEGORIES
              </Link>
            </div>
          </section>
          <section className="mt-20">
            <h2 className="my-12 text-center text-bold text-4xl">
              Discover Your Next Book
            </h2>
            <div className="grid max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4 max-xl:grid-cols-6 min-xl:grid-cols-6 mx-6 gap-6">
              <Link to="" className="card flex flex-col">
                <img
                  src="https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/team1-copyright-570x741.jpg"
                  alt=""
                />
                <div className="text-lg font-bold text-left ">Amy Stevens</div>
                <div className="text-sm text-left">Author</div>
              </Link>
              <Link to="" className="card flex flex-col">
                <img
                  src="https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/team1-copyright-570x741.jpg"
                  alt=""
                />
                <div className="text-lg font-bold text-left ">Amy Stevens</div>
                <div className="text-sm text-left">Author</div>
              </Link>
              <Link to="" className="card flex flex-col">
                <img
                  src="https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/team1-copyright-570x741.jpg"
                  alt=""
                />
                <div className="text-lg font-bold text-left ">Amy Stevens</div>
                <div className="text-sm text-left">Author</div>
              </Link>
              <Link to="" className="card flex flex-col">
                <img
                  src="https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/team1-copyright-570x741.jpg"
                  alt=""
                />
                <div className="text-lg font-bold text-left ">Amy Stevens</div>
                <div className="text-sm text-left">Author</div>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link
                to=""
                className="mt-6 border-black bg-black text-white px-6 py-3 font-medium hover:bg-[rgb(255,255,255,0.1)] hover:border-black hover:text-black border-2 transition cursor-pointer"
              >
                DISCOVER MORE BOOKS
              </Link>
            </div>
          </section>
            */}
        </div>
      )}
      <div className="mb-16"></div>
    </>
  )
}

export default Home
