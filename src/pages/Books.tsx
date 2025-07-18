import {
  useGetFilteredBooksQuery,
  useGetAllGenresQuery,
  useGetAllAuthorsQuery,
  type Book,
} from '../redux/api/apiSlice'
import { useEffect, useState } from 'react'
import { checkImageUrl } from '@/utils/checkImageUrl'
import BookCard from '@/components/BookCard'

const Books = () => {
  const [sortBy, setSortBy] = useState('desc')
  const [selectedGenre, setSelectedGenre] = useState('ALL')
  const [selectedAuthor, setSelectedAuthor] = useState('ALL')
  const [updatedBooks, setUpdatedBooks] = useState<Book[]>([])

  /*   const {
    data: allBooks,
    isBooksLoading: isAllBooksLoading,
    isBooksError: isAllBooksError,
  } = useGetAllBooksQuery() */

  const {
    data: sortedBooks,
    isLoading: isBooksLoading,
    isError: isBooksError,
  } = useGetFilteredBooksQuery(
    {
      filter: selectedGenre,
      author: selectedAuthor,
      sortBy: 'createdAt',
      sort: sortBy,
      limit: 0,
    },
    { refetchOnMountOrArgChange: true }
  )

  const {
    data: genres,
    isLoading: isGenresLoading,
    // isError: isGenresError,
  } = useGetAllGenresQuery()

  const {
    data: authors,
    isLoading: isAuthorsLoading,
    // isError: isAuthorsError,
  } = useGetAllAuthorsQuery()

  useEffect(() => {
    if (!sortedBooks) return

    setUpdatedBooks(sortedBooks)

    const validateImages = async () => {
      const checkedBooks = await Promise.all(
        sortedBooks.map(async (book) => {
          if (book?.imageUrl) {
            const visible = await checkImageUrl(book.imageUrl)
            return visible ? book : { ...book, imageUrl: undefined }
          }
          return book
        })
      )

      setUpdatedBooks(checkedBooks)
    }

    validateImages()
  }, [sortedBooks])

  useEffect(() => {
    if (isBooksError) {
      setSelectedGenre('ALL')
      setSelectedAuthor('ALL')
      setUpdatedBooks([])
    }
  }, [isBooksError])

  if (isBooksLoading || isGenresLoading || isAuthorsLoading)
    return <div className="p-6 text-center">Loading...</div>

  /*   if (
    isBooksError ||
    !updatedBooks ||
    isGenresError ||
    !genres ||
    isAuthorsError ||
    !authors
  ) {
    console.log('Error Loading Books', {
      isBooksError,
      updatedBooks,
      isGenresError,
      genres,
      isAuthorsError,
      authors,
    })
  } */

  return (
    <div className="flex flex-col flex-1">
      <div className="bg-gray-900 p-4 text-white text-center font-bold text-3xl">
        Books
      </div>
      <div className="w-full bg-neutral-200 grid sm:grid-cols-[20rem_1fr] flex-col flex-1">
        <section className="bg-white w-full md:w-80">
          <div className="sort-by p-4 space-y-4">
            <h4 className="text-xl font-bold relative h-12 uppercase">
              <span className="text-black font-bold">Sort By</span>
              <span className="w-20 border-b border-neutral-400 absolute bottom-0 left-0"></span>
            </h4>
            <div className="space-y-4">
              {}
              <div>
                <input
                  id="desc"
                  type="checkbox"
                  checked={sortBy === 'desc'}
                  onChange={() => setSortBy('desc')}
                  className="font-bold hover:text-fuchsia-600 cursor-pointer"
                  value="Newest First"
                />
                <label
                  className="ml-2 font-bold hover:text-fuchsia-600 cursor-pointer"
                  htmlFor="desc"
                >
                  Newest First
                </label>
              </div>
              <div>
                <input
                  id="asc"
                  type="checkbox"
                  checked={sortBy === 'asc'}
                  onChange={() => setSortBy('asc')}
                  className="font-bold hover:text-fuchsia-600 cursor-pointer"
                  value="Oldest First"
                />
                <label
                  className="ml-2 font-bold hover:text-fuchsia-600 cursor-pointer"
                  htmlFor="asc"
                >
                  Oldest First
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
              <div
                onClick={() => setSelectedGenre('ALL')}
                className={`${
                  selectedGenre === 'ALL' ? 'text-fuchsia-600' : 'text-inherit'
                } font-bold hover:text-fuchsia-600 capitalize cursor-pointer`}
              >
                all category
              </div>
              {genres?.map((genre, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedGenre(genre)}
                  className={`${
                    genre === selectedGenre
                      ? 'text-fuchsia-600'
                      : 'text-inherit'
                  } font-bold hover:text-fuchsia-600 capitalize cursor-pointer`}
                >
                  {genre.toLowerCase()}
                </div>
              ))}
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
                  id="all"
                  type="checkbox"
                  checked={selectedAuthor === 'ALL'}
                  onChange={() => setSelectedAuthor('ALL')}
                  className={`${
                    selectedAuthor === 'ALL' ? 'text-fuchsia-600' : 'text-black'
                  } font-bold hover:text-fuchsia-600 cursor-pointer`}
                  value="All Author"
                />
                <label
                  className="ml-2 font-bold hover:text-fuchsia-600 cursor-pointer"
                  htmlFor="all"
                >
                  All Author
                </label>
              </div>
              {authors?.map((author, index) => (
                <div key={index}>
                  <input
                    id={index.toString()}
                    type="checkbox"
                    checked={author === selectedAuthor}
                    onChange={() => setSelectedAuthor(author)}
                    className="font-bold hover:text-fuchsia-600 cursor-pointer"
                    value="Burt Geler"
                  />
                  <label
                    className="ml-2 font-bold hover:text-fuchsia-600 cursor-pointer"
                    htmlFor={index.toString()}
                  >
                    {author}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full">
          {isBooksError ? (
            <div className="mx-8 mt-4">
              <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
                <p className="text-center text-gray-500">No books found.</p>
              </div>
            </div>
          ) : null}
          <div className="grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {updatedBooks?.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                noCoverImgLink="https://i.postimg.cc/PJrVp8wy/no-cover.png"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Books
