import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  useGetBookByIdQuery,
  useBorrowBookMutation,
  type Book,
} from '../redux/api/apiSlice'
import { checkImageUrl } from '@/utils/checkImageUrl'
import toast from 'react-hot-toast'
import { SquarePen, Trash } from 'lucide-react'
import DeleteBook from '@/components/DeleteBook'

const BookDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [updatedBook, setUpdatedBook] = useState<Book | undefined>(undefined)
  const [borrowBook] = useBorrowBookMutation()
  const [copies, setCopies] = useState(1)
  const [date, setDate] = useState('')
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false)

  interface InputError {
    copies: string | null
    dueDate: string | null
  }

  const [inputError, setInputError] = useState<InputError>({
    copies: null,
    dueDate: null,
  })

  const { data: book, isLoading, isError } = useGetBookByIdQuery(id || '')

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
    setInputError({ ...inputError, copies: null })
    if (book && Number(event.target.value) > book?.copies) {
      setInputError({
        ...inputError,
        copies: 'Copies should be at most total available books',
      })
    }
    if (Number(event.target.value) === 0) {
      setInputError({
        ...inputError,
        copies: 'Copies should be at least 1',
      })
    }
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateStr = event.target.value
    setDate(selectedDateStr)
    const today = new Date()
    const minAllowedDate = new Date(today)
    minAllowedDate.setDate(today.getDate() + 4)

    setInputError({ ...inputError, dueDate: null })

    const selectedDate = new Date(selectedDateStr)
    selectedDate.setHours(0, 0, 0, 0)
    minAllowedDate.setHours(0, 0, 0, 0)

    if (selectedDate < minAllowedDate) {
      setInputError({
        ...inputError,
        dueDate: 'Due date should be at least 5 days from today',
      })
    } else {
      setInputError({ ...inputError, dueDate: null })
    }
  }

  const handleSubmit = async () => {
    if (inputError?.copies || inputError.dueDate) {
      toast.error('Please fix the validation errors')
      if (inputError?.copies) {
        return
      }
      if (inputError?.dueDate) {
        return
      }
    }

    try {
      if (!book?._id) {
        toast.error('Book ID is missing.')
        return
      }
      const res = await borrowBook({
        book: book._id,
        quantity: copies,
        dueDate: new Date(date).toISOString(),
      }).unwrap()
      toast.success(res.message)
      setTimeout(() => {
        navigate(`/borrow-summary`)
      }, 500)
    } catch (err) {
      console.error('Borrow failed:', err)
      toast.error('Failed to borrow the book.')
    }
  }

  if (isLoading) return <div className="p-6 text-center">Loading...</div>
  if (isError || !book)
    return <div className="p-6 text-center">Error loading book.</div>
  return (
    <>
      <DeleteBook
        book={book}
        deleteButtonClicked={deleteButtonClicked}
        setDeleteButtonClicked={setDeleteButtonClicked}
        triggeredFromComponent="BookDetails"
      />

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
                {book?.copies === 0 ? (
                  <span className="font-bold text-red-600">Not available</span>
                ) : (
                  <span className="font-bold">{book?.copies}</span>
                )}
              </div>
            </div>
            {book?.copies !== 0 ? (
              <>
                <h3 className="text-2xl font-semibold mb-2 mt-8">
                  Form to Borrow
                </h3>

                {/* Borrow Inputs */}
                <div className="flex items-center gap-x-4 mt-4">
                  <span className="text-gray-500 font-bold w-48">
                    Copies to Borrow:
                  </span>
                  <input
                    min={1}
                    max={book.copies}
                    value={copies}
                    type="number"
                    placeholder="Copies to Borrow"
                    onChange={handleCopiesChange}
                    className="w-20 p-2 border-2 border-gray-300 outline-none"
                  />
                </div>
                {inputError.copies ? (
                  <div className="text-red-600 text-sm mt-1">
                    {inputError.copies}
                  </div>
                ) : null}
                <div className="flex items-center gap-x-4 mt-2">
                  <span className="text-gray-500 font-bold w-48">
                    Due Date:
                  </span>
                  <input
                    value={date}
                    type="date"
                    min={
                      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split('T')[0]
                    }
                    onChange={handleDateChange}
                    onBlur={handleDateChange}
                    className="w-40 p-2 border-2 border-gray-300 outline-none"
                  />
                </div>
                {inputError.dueDate ? (
                  <div className="text-red-600 text-sm mt-1">
                    {inputError.dueDate}
                  </div>
                ) : null}

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
                </div>
              </>
            ) : null}

            <div className="mt-10 border-t-2 border-gray-300"></div>
            <div className="mt-10 flex justify-center">
              <span className="inline-flex border-1 border-red-300 hover:border-red-600 transition duration-500">
                <button
                  className="flex items-center px-4 py-2 bg-white text-red-600 font-medium cursor-pointer hover:shadow-[2px_2px_16px_rgba(0,0,0,0.1),-2px_-2px_16px_rgba(0,0,0,0.1)] hover:drop-shadow-xl hover:text-white hover:bg-red-600 transition-all duration-500"
                  onClick={() => setDeleteButtonClicked(true)}
                >
                  <span className="mr-2">Delete the Book</span> <Trash />
                </button>
              </span>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default BookDetails
