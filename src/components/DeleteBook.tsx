import { useDeleteBookMutation, type Book } from '../redux/api/apiSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface DeleteBookProps {
  book: Book
  deleteButtonClicked: boolean
  setDeleteButtonClicked: (value: boolean) => void
  triggeredFromComponent?: string | null
}

function DeleteBook({
  book,
  deleteButtonClicked,
  setDeleteButtonClicked,
  triggeredFromComponent = null,
}: DeleteBookProps) {
  const navigate = useNavigate()

  const [deleteBook] = useDeleteBookMutation()

  const handleDeleteConfirmationClick = async () => {
    const bookTitle = book?.title
    try {
      const result = await deleteBook(book?._id as string).unwrap()
      if (result.success) {
        toast.success(`Successfully deleted the book: ${bookTitle}`)
        if (triggeredFromComponent === 'BookDetails') navigate('/books')
      }
    } catch (err) {
      console.error('Failed to delete:', err)
    }
    setDeleteButtonClicked(false)
  }

  return deleteButtonClicked ? (
    <div className="flex fixed top-0 right-0 bottom-0 left-0 justify-center items-center bg-[rgba(0,0,0,0.7)] w-full h-lvh z-10">
      <div className="bg-white p-8 space-y-4 max-w-100 mx-8">
        <div className="text-justify">
          {`Are you sure you want to delete the book "${book?.title}"?`}
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
  ) : null
}

export default DeleteBook
