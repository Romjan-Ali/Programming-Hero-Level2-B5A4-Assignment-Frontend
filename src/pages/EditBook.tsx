import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from '../redux/api/apiSlice'

import type { Book } from '../redux/api/apiSlice'

const EditBook = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    data: book,
    isLoading: isFetching,
    isError,
  } = useGetBookByIdQuery(id || '')
  const [updateBook, { isLoading }] = useUpdateBookMutation()

  const [formData, setFormData] = useState<Book | null>(null)

  useEffect(() => {
    if (book) setFormData(book)
  }, [book])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    if (!formData) return

    setFormData({
      ...formData,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
          ? +value
          : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData || !id) return

    try {
      const result = await updateBook({
        id,
        updatedData: {
          ...formData,
        },
      }).unwrap()

      if (result) toast.success('Book updated successfully!')
      navigate(`/books/${id}`)
    } catch (err) {
      toast.error('Failed to update book')
      console.error(err)
    }
  }

  if (isFetching || !formData)
    return <div className="p-6 text-center">Loading book data...</div>

  if (isError)
    return <div className="p-6 text-center">Failed to load book data.</div>

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
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="FICTION">Fiction</option>
            <option value="NON_FICTION">Non-Fiction</option>
            <option value="SCIENCE">Science</option>
            <option value="HISTORY">History</option>
            <option value="BIOGRAPHY">Biography</option>
            <option value="FANTASY">Fantasy</option>
          </select>

          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="ISBN"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl ?? ''}
            onChange={handleChange}
            placeholder="Cover Image URL (Optional)"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          <input
            type="number"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            placeholder="Number of Copies"
            min={1}
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
            disabled={isLoading}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-900 cursor-pointer"
          >
            {isLoading ? 'Updating...' : 'Update Book'}
          </button>
        </form>
      </div>
    </>
  )
}

export default EditBook
