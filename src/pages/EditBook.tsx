import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useUpdateBookMutation,
  useGetBookByIdQuery,
} from '../redux/api/apiSlice'
import { BadgeCheck, CircleX, LoaderCircle } from 'lucide-react'
import { checkImageUrl } from '@/utils/checkImageUrl'

type Book = {
  title: string
  author: string
  genre: string
  isbn: string
  description: string
  copies: number
  available: boolean
  imageUrl?: string
}

const EditBook = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [inputError, setInputError] = useState<{
    title: string | null
    author: string | null
    genre: string | null
    isbn: string | null
    description: string | null
  }>({
    title: null,
    author: null,
    genre: null,
    isbn: null,
    description: null,
  })

  const [isImageVisible, setIsImageVisible] = useState(false)
  const [isVerifyingImgUrl, setIsVerifyingImgUrl] = useState(false)

  const [formData, setFormData] = useState<Book>({
    title: '',
    author: '',
    genre: 'FICTION',
    isbn: '',
    description: '',
    copies: 1,
    available: true,
  })

  const {
    data: book,
    isLoading: isFetching,
    isError,
    error,
  } = useGetBookByIdQuery(id || '')

  const [updateBook] = useUpdateBookMutation()

  useEffect(() => {
    if (book) {
      setFormData(book)
    }
  }, [book])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    let updated_form_data = {
      ...formData,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
          ? +value
          : value,
    }

    if (type === 'number') {
      if (updated_form_data.copies > 0) {
        updated_form_data = { ...updated_form_data, available: true }
      } else {
        updated_form_data = { ...updated_form_data, available: false }
      }
    } else if (type === 'checkbox') {
      if (updated_form_data.available) {
        updated_form_data = { ...updated_form_data, copies: 1 }
      } else {
        updated_form_data = { ...updated_form_data, copies: 0 }
      }
    }

    setFormData(updated_form_data)
  }

  useEffect(() => {
    if (formData.imageUrl && formData.imageUrl?.trim().length > 0) {
      const check_image_url = async () => {
        setIsVerifyingImgUrl(true)
        const isValid = await checkImageUrl(formData.imageUrl!)
        setIsImageVisible(isValid)
        setIsVerifyingImgUrl(false)
      }
      check_image_url()
    }
  }, [formData.imageUrl])

  interface ValidationErrors {
    title: string | null
    author: string | null
    genre: string | null
    isbn: string | null
    description: string | null
  }

  type ValidateFormEvent =
    | React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    | undefined

  const validateForm = (e: ValidateFormEvent): boolean => {
    let hasError = false
    const errors: ValidationErrors = {
      title: null,
      author: null,
      genre: null,
      isbn: null,
      description: null,
    }

    if (e) {
      const { name } = e.target

      if (name && name === 'title' && formData.title.trim().length === 0) {
        errors.title = 'Book Title is required'
        hasError = true
      } else if (name && name === 'title' && formData.title.trim().length < 3) {
        errors.title = 'Book Title should be at least 3 characters'
        hasError = true
      } else if (
        name &&
        name === 'title' &&
        formData.title.trim().length > 80
      ) {
        errors.title = 'Book Title should be at most 80 characters'
        hasError = true
      }

      if (name && name === 'author' && formData.author.trim().length === 0) {
        errors.author = 'Author name is required'
        hasError = true
      } else if (
        name &&
        name === 'author' &&
        formData.author.trim().length < 3
      ) {
        errors.author = 'Author name should be at least 3 characters'
        hasError = true
      } else if (
        name &&
        name === 'author' &&
        formData.author.trim().length > 60
      ) {
        errors.author = 'Author name should be at most 60 characters'
        hasError = true
      }

      if (name && name === 'isbn' && formData.isbn.trim().length === 0) {
        errors.isbn = 'ISBN is required'
        hasError = true
      } else if (name && name === 'isbn' && formData.isbn.trim().length < 5) {
        errors.isbn = 'ISBN should be at least 5 characters'
        hasError = true
      } else if (name && name === 'isbn' && formData.isbn.trim().length > 20) {
        errors.isbn = 'ISBN should be at most 20 characters'
        hasError = true
      }

      if (
        name &&
        name === 'description' &&
        formData.description.trim().length === 0
      ) {
        errors.description = 'Description is required'
        hasError = true
      } else if (
        name &&
        name === 'description' &&
        formData.description.trim().length < 15
      ) {
        errors.description = 'Description should be at least 15 characters'
        hasError = true
      } else if (
        name &&
        name === 'description' &&
        formData.description.trim().length > 2000
      ) {
        errors.description = 'Description should be at most 2000 characters'
        hasError = true
      }

      if (!isImageVisible) {
        hasError = true
      }
    } else {
      if (formData.title.trim().length === 0) {
        errors.title = 'Book Title is required'
        hasError = true
      } else if (formData.title.trim().length < 3) {
        errors.title = 'Book Title should be at least 10 characters'
        hasError = true
      } else if (formData.title.trim().length > 80) {
        errors.title = 'Book Title should be at most 80 characters'
        hasError = true
      }

      if (formData.author.trim().length === 0) {
        errors.author = 'Author name is required'
        hasError = true
      } else if (formData.author.trim().length < 3) {
        errors.author = 'Author name should be at least 3 characters'
        hasError = true
      } else if (formData.author.trim().length > 60) {
        errors.author = 'Author name should be at most 60 characters'
        hasError = true
      }

      if (formData.isbn.trim().length === 0) {
        errors.isbn = 'ISBN is required'
        hasError = true
      } else if (formData.isbn.trim().length < 5) {
        errors.isbn = 'ISBN should be at least 5 characters'
        hasError = true
      } else if (formData.isbn.trim().length > 20) {
        errors.isbn = 'ISBN should be at most 20 characters'
        hasError = true
      }

      if (formData.description.trim().length === 0) {
        errors.description = 'Description is required'
        hasError = true
      } else if (formData.description.trim().length < 15) {
        errors.description = 'Description should be at least 15 characters'
        hasError = true
      } else if (formData.description.trim().length > 2000) {
        errors.description = 'Description should be at most 2000 characters'
        hasError = true
      }

      if (formData.imageUrl && formData.imageUrl !== '' && !isImageVisible) {
        hasError = true
      }
    }

    setInputError(errors)
    return !hasError
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm(undefined)) {
      toast.error('Please fix the validation errors')
      return
    }

    if (!formData || !id) return

    const updated_form_data: Book = isImageVisible
      ? formData
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (({ imageUrl, ...rest }) => rest)(formData)

    try {
      const result = await updateBook({
        id,
        updatedData: updated_form_data,
      }).unwrap()
      setFormData({
        title: '',
        author: '',
        genre: 'FICTION',
        isbn: '',
        description: '',
        copies: 1,
        available: true,
      })
      if ('success' in result && result.success) {
        toast.success('Book updated successfully')
        navigate(`/books/${book?._id}`)
      }
    } catch (err) {
      toast.error('Failed to update book')
      console.error(err)
    }
  }

  if (isFetching) return <div className="p-6 text-center">Loading...</div>
  if (isError)
    return (
      <div className="p-6 text-center">Error getting server connection</div>
    )
  if (error) return <div className="p-6 text-center">Error creating book</div>

  return (
    <>
      <div className="bg-gray-900 p-4 text-white text-center font-bold text-3xl">
        Edit Book
      </div>
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white shadow-md p-6 rounded space-y-4"
        >
          <div>
            <input
              type="text"
              name="title"
              min={3}
              max={80}
              value={formData.title}
              onChange={handleChange}
              onBlur={validateForm}
              placeholder="Book Title"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {inputError.title ? (
              <div className="text-red-600 text-sm mt-1">
                {inputError.title}
              </div>
            ) : null}
          </div>

          <div>
            <input
              type="text"
              name="author"
              min={3}
              max={60}
              value={formData.author}
              onChange={handleChange}
              onBlur={validateForm}
              placeholder="Author"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {inputError.author ? (
              <div className="text-red-600 text-sm mt-1">
                {inputError.author}
              </div>
            ) : null}
          </div>

          <div>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              onBlur={validateForm}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="FICTION">Fiction</option>
              <option value="NON_FICTION">Non-Fiction</option>
              <option value="SCIENCE">Science</option>
              <option value="HISTORY">History</option>
              <option value="BIOGRAPHY">Biography</option>
              <option value="FANTASY">Fantasy</option>
            </select>
            {inputError.genre ? (
              <div className="text-red-600 text-sm mt-1">
                {inputError.genre}
              </div>
            ) : null}
          </div>

          <div>
            <input
              type="text"
              name="isbn"
              min={5}
              max={20}
              value={formData.isbn}
              onChange={handleChange}
              onBlur={validateForm}
              placeholder="ISBN"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {inputError.isbn ? (
              <div className="text-red-600 text-sm mt-1">{inputError.isbn}</div>
            ) : null}
          </div>

          <div>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              onBlur={validateForm}
              placeholder="Cover Image URL (Optional)"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {!formData.imageUrl ? null : isVerifyingImgUrl ? (
              <div className="text-blue-800 text-sm mt-1 flex items-center space-x-2">
                <span className="animate-spin">
                  <LoaderCircle size={16} />
                </span>
                <span>Verifying image URL</span>
              </div>
            ) : isImageVisible ? (
              <div className="text-green-700 text-sm mt-1 flex items-center space-x-2">
                <span>
                  <BadgeCheck size={16} />
                </span>
                <span>Verified image URL</span>
              </div>
            ) : !isImageVisible ? (
              <div className="text-red-600 text-sm mt-1 flex items-center space-x-2">
                <span>
                  <CircleX size={16} />
                </span>
                <span>
                  Invalid image URL or image may not visible of this link
                </span>
              </div>
            ) : null}
          </div>

          <div>
            <textarea
              name="description"
              minLength={15}
              maxLength={2000}
              rows={3}
              value={formData.description}
              onChange={handleChange}
              onBlur={validateForm}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {inputError.description ? (
              <div className="text-red-600 text-sm mt-1">
                {inputError.description}
              </div>
            ) : null}
          </div>

          <input
            type="number"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            onBlur={validateForm}
            placeholder="Number of Copies"
            min={0}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              id="available"
            />
            <label htmlFor="available" className="text-sm font-medium">
              Available
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-900 cursor-pointer"
          >
            Submit Book
          </button>
        </form>
      </div>
    </>
  )
}

export default EditBook
