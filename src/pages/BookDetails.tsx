import { useParams } from 'react-router-dom'
import {
  useGetBookByIdQuery,
  useBorrowBookMutation,
} from '../redux/api/apiSlice'
import { useState } from 'react'

const BookDetails = () => {
  const { id } = useParams()
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id || '')

  const [borrowBook] = useBorrowBookMutation()
  const [copies, setCopies] = useState(1)
  const [date, setDate] = useState('')

  if (isLoading) return <div className="p-6 text-center">Loading...</div>
  if (isError || !book)
    return <div className="p-6 text-center">Error loading book.</div>

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

      alert(res.message || 'Book borrowed successfully!')
    } catch (err) {
      console.error('Borrow failed:', err)
      alert('Failed to borrow the book.')
    }
  }

  return (
    <section>
      <div className="bg-gray-900 p-4 text-white text-center font-bold text-3xl">
        Book Details
      </div>
      <section className="max-w-screen-lg mx-auto grid max-md:grid-cols-1 min-md:grid-cols-2 gap-x-10 p-6">
        <div>
          <img
            className="w-full"
            src={
              book?.imageUrl
                ? book?.imageUrl
                : 'https://www.peeters-leuven.be/covers/no_cover.gif'
            }
            alt={book?.title}
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2 max-md:mt-4">
            {book?.title}
          </h3>

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
          <div className="mt-4">
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
        </div>
      </section>
    </section>
  )
}

export default BookDetails
