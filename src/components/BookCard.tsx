import { Ellipsis, SquarePen, Trash } from 'lucide-react'
import { type Book } from '@/redux/api/apiSlice'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import DeleteBook from './DeleteBook'

interface BookCardProps {
  book: Book
  // handleDeleteButtonClick: (id: string) => void
  noCoverImgLink: string
}

function BookCard({ book, noCoverImgLink }: BookCardProps) {
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false)

  return (
    <>
      <DeleteBook
        book={book}
        deleteButtonClicked={deleteButtonClicked}
        setDeleteButtonClicked={setDeleteButtonClicked}
      />
      <div key={book?._id} className="card flex flex-col overflow-hidden">
        <Link to={`/books/${book._id}`} className="relative group aspect-[2/3]">
          <img
            src={book?.imageUrl ? book?.imageUrl : noCoverImgLink}
            alt="No Cover"
            className="object-cover h-full w-full"
          />
          <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-[rgba(0,0,0,0.3)] transition-all duration-500">
            <div className="flex justify-center items-center w-full h-full text-yellow-400">
              <Ellipsis size={30} />
            </div>
          </div>
        </Link>
        <div className="border-t-[0.5px] border-gray-300 -translate-x-1/2"></div>
        <div className="flex justify-evenly bg-white">
          <Link
            to={`/edit-book/${book?._id}`}
            className="hover:text-white hover:bg-blue-400 p-2 w-full flex justify-center items-center transition duration-500"
          >
            <SquarePen />
          </Link>
          <div className="border-l-[0.5px] border-gray-300 -translate-x-1/2"></div>
          <Link
            to="#"
            onClick={() => setDeleteButtonClicked(true)}
            className="hover:text-white hover:bg-red-500 p-2 w-full flex justify-center items-center transition duration-300"
          >
            <Trash />
          </Link>
        </div>
        <Link to={`/books/${book._id}`}>
          <div className="mt-2 text-xl font-bold text-center hover:text-cyan-600 transition duration-300">
            {book?.title}
          </div>
          <div className="text-lg text-center text-fuchsia-700">
            {book?.author}
          </div>
        </Link>
      </div>
    </>
  )
}

export default BookCard
