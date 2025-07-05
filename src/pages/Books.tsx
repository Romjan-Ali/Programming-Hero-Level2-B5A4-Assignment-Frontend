import { Link } from 'react-router-dom'
import { useGetAllBooksQuery } from '../redux/api/apiSlice'

const Books = () => {
  const { data: books, isLoading, isError } = useGetAllBooksQuery()

  if (isLoading) return <div className="p-6 text-center">Loading...</div>
  if (isError || !books)
    return <div className="p-6 text-center">Error loading book.</div>

  return (
    <div>
      <div className="bg-gray-900 p-4 text-white text-center font-bold text-3xl">
        Books
      </div>
      <div className="w-full bg-neutral-200 grid md:grid-cols-[20rem_1fr]">
        <section className="bg-white w-full md:w-80">
          <div className="sort-by p-4 space-y-4">
            <h4 className="text-xl font-bold relative h-12 uppercase">
              <span className="text-black font-bold">Sort By</span>
              <span className="w-20 border-b border-neutral-400 absolute bottom-0 left-0"></span>
            </h4>
            <div className="space-y-4">
              <div>
                <input
                  id="2"
                  type="checkbox"
                  className="font-bold hover:text-fuchsia-600 cursor-pointer"
                  value="Burt Geler"
                />
                <label
                  className="ml-2 font-bold hover:text-fuchsia-600 cursor-pointer"
                  htmlFor="2"
                >
                  Burt Geler
                </label>
              </div>
              <div>
                <input
                  id="3"
                  type="checkbox"
                  className="font-bold hover:text-fuchsia-600 cursor-pointer"
                  value="Burt Geler"
                />
                <label
                  className="ml-2 font-bold hover:text-fuchsia-600 cursor-pointer"
                  htmlFor="3"
                >
                  Burt Geler
                </label>
              </div>
            </div>
          </div>

          <div className="category p-4 space-y-4">
            <h4 className="text-xl font-bold relative h-12 uppercase">
              <span className="text-black font-bold">Category</span>
              <span className="w-20 border-b border-neutral-400 absolute bottom-0 left-0"></span>
            </h4>
            <div className="space-y-4">
              <div className="font-bold hover:text-fuchsia-600 cursor-pointer">
                All Categories
              </div>
              <div className="font-bold hover:text-fuchsia-600 cursor-pointer">
                Uncategorized
              </div>
              <div className="font-bold hover:text-fuchsia-600 cursor-pointer">
                Drama
              </div>
              <div className="font-bold hover:text-fuchsia-600 cursor-pointer">
                Mystery
              </div>
              <div className="font-bold hover:text-fuchsia-600 cursor-pointer">
                Novels
              </div>
              <div className="font-bold hover:text-fuchsia-600 cursor-pointer">
                Recipe Books
              </div>
            </div>
          </div>

          <div className="author p-4 space-y-4">
            <h4 className="text-xl font-bold relative h-12 uppercase">
              <span className="text-black font-bold">Author</span>
              <span className="w-20 border-b border-neutral-400 absolute bottom-0 left-0"></span>
            </h4>
            <div className="space-y-4">
              <div>
                <input
                  id="2"
                  type="checkbox"
                  className="font-bold hover:text-fuchsia-600 cursor-pointer"
                  value="Burt Geler"
                />
                <label
                  className="ml-2 font-bold hover:text-fuchsia-600 cursor-pointer"
                  htmlFor="2"
                >
                  Burt Geler
                </label>
              </div>
              <div>
                <input
                  id="3"
                  type="checkbox"
                  className="font-bold hover:text-fuchsia-600 cursor-pointer"
                  value="Burt Geler"
                />
                <label
                  className="ml-2 font-bold hover:text-fuchsia-600 cursor-pointer"
                  htmlFor="3"
                >
                  Burt Geler
                </label>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full">
          <div className="grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books?.map((book) => (
              <Link
                key={book?._id}
                to={`/books/${book._id}`}
                className="card flex flex-col"
              >
                <img
                  src={
                    book?.imageUrl
                      ? book?.imageUrl
                      : 'https://www.peeters-leuven.be/covers/no_cover.gif'
                  }
                  alt=""
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
        </section>
      </div>
    </div>
  )
}

export default Books
