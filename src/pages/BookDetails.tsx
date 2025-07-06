import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { SquarePen, Trash } from 'lucide-react'
import {
  useGetBookByIdQuery,
  useBorrowBookMutation,
  useDeleteBookMutation,
  type Book,
} from '../redux/api/apiSlice'
import { checkImageUrl } from '@/components/utils/checkImageUrl'
import toast from 'react-hot-toast'

const BookDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [updatedBook, setUpdatedBook] = useState<Book | undefined>(undefined)
  const [borrowBook] = useBorrowBookMutation()
  const [copies, setCopies] = useState(1)
  const [date, setDate] = useState('')
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false)

  const { data: book, isLoading, isError } = useGetBookByIdQuery(id || '')
  const [deleteBook] = useDeleteBookMutation()

  useEffect(() => {
    const verify = async () => {
      if (book?.imageUrl) {
        const visible = await checkImageUrl(book.imageUrl)
        if (!visible && book) {
          setUpdatedBook({ ...book, imageUrl: undefined })
        } else {
          setUpdatedBook(book)
        }
      } else if (book) {
        setUpdatedBook(book)
      }
    }

    verify()
  }, [book])

  const handleCopiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCopies(Number(event.target.value))
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  const handleSubmit = async () => {
    if (!book || !date) {
      alert('Please select a due date.')
      return
    }

    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // remove time part

    if (selectedDate < today) {
      alert('Due date cannot be in the past.')
      return
    }

    try {
      const res = await borrowBook({
        book: book._id,
        quantity: copies,
        dueDate: new Date(date).toISOString(),
      }).unwrap()
      toast.success(res.message)
    } catch (err) {
      console.error('Borrow failed:', err)
      toast.error('Failed to borrow the book.')
    }
  }

  const handleDeleteConfirmationClick = async () => {
    const bookTitle = book?.title
    try {
      const res = await deleteBook(book?._id as string).unwrap()
      console.log(res)
    } catch (err) {
      console.error('Failed to delete:', err)
    }
    setDeleteButtonClicked(false)
    navigate('/books')
    toast.success(`Successfully deleted the book: ${bookTitle}`)
  }

  if (isLoading) return <div className="p-6 text-center">Loading...</div>
  if (isError || !book)
    return <div className="p-6 text-center">Error loading book.</div>
  return (
    <>
      {deleteButtonClicked ? (
        <div className="flex fixed top-0 right-0 bottom-0 left-0 justify-center items-center bg-[rgba(0,0,0,0.7)] w-full h-lvh z-10">
          <div className="bg-white p-8 space-y-4 max-w-80">
            <div className="text-justify">
              Are you sure you want to delete the book?
            </div>
            <div className="flex justify-between max-w-40 ml-auto">
              <button
                className="px-4 py-2 bg-gray-700 text-white font-bold hover:bg-gray-900 cursor-pointer"
                onClick={() => setDeleteButtonClicked(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-700 cursor-pointer"
                onClick={handleDeleteConfirmationClick}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <section>
        <div className="bg-gray-900 p-4 text-white text-center font-bold text-3xl">
          Book Details
        </div>
        <section className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-10 p-6">
          <div>
            <img
              className="w-full"
              src={
                updatedBook?.imageUrl
                  ? updatedBook?.imageUrl
                  : 'https://www.peeters-leuven.be/covers/no_cover.gif'
              }
              alt={book?.title}
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold mb-2 max-md:mt-4">
                {book?.title}
              </h3>
              <Link 
              to={`/edit-book/${book?._id}`}
              className="text-blue-500 flex space-x-2 cursor-pointer"
              >
                <span>Edit</span>{' '}
                <span>
                  <SquarePen />
                </span>
              </Link>
            </div>

            <p className="text-sm mb-4">
              <span className="text-gray-500 font-medium">Author:</span>{' '}
              <span className="font-semibold">{book?.author}</span>
            </p>

            <p className="description mb-4">{book?.description}</p>

            {/* Info Table */}
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-500 font-bold w-48">Genre:</span>
                <span className="font-bold">{book?.genre}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 font-bold w-48">ISBN:</span>
                <span className="font-bold">{book?.isbn}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 font-bold w-48">
                  Available Copies:
                </span>
                <span className="font-bold">{book?.copies}</span>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-2 mt-8">Form to Borrow</h3>

            {/* Borrow Inputs */}
            <div className="flex items-center gap-x-4 mt-4">
              <span className="text-gray-500 font-bold w-48">
                Copies to Borrow:
              </span>
              <input
                value={copies}
                type="number"
                placeholder="Copies to Borrow"
                min={1}
                max={book.copies}
                onChange={handleCopiesChange}
                className="w-20 p-2 border-2 border-gray-300 outline-none"
              />
            </div>
            <div className="flex items-center gap-x-4 mt-2">
              <span className="text-gray-500 font-bold w-48">Due Date:</span>
              <input
                value={date}
                type="date"
                onChange={handleDateChange}
                className="w-40 p-2 border-2 border-gray-300 outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex mt-4 items-center">
              <button
                className="px-4 py-2 drop-shadow-xl bg-white text-black font-medium cursor-pointer"
                style={{
                  boxShadow:
                    '2px 2px 16px 0 rgba(0, 0, 0, 0.1), -2px -2px 16px 0 rgba(0, 0, 0, 0.1)',
                }}
                onClick={handleSubmit}
              >
                BORROW NOW
              </button>

              <button
                className="ml-4 px-4 py-2 drop-shadow-xl bg-white text-red-600 font-medium cursor-pointer"
                style={{
                  boxShadow:
                    '2px 2px 16px 0 rgba(0, 0, 0, 0.1), -2px -2px 16px 0 rgba(0, 0, 0, 0.1)',
                }}
                onClick={() => setDeleteButtonClicked(true)}
              >
                <Trash />
              </button>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default BookDetails
