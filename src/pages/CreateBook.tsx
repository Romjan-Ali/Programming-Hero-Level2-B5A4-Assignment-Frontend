import React, { useEffect, useState } from 'react'
import { useCreateBookMutation } from '../redux/api/apiSlice'

type Book = {
  title: string
  author: string
  genre: string
  isbn: string
  description: string
  copies: number
  available: boolean
}

const CreateBook = () => {
  const [createBook, { isLoading, isError, error, isSuccess }] =
    useCreateBookMutation()

  const [formData, setFormData] = useState<Book>({
    title: '',
    author: '',
    genre: 'FANTASY',
    isbn: '',
    description: '',
    copies: 1,
    available: true,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
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

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createBook(formData).unwrap()
      alert('Book created successfully!')
      setFormData({
        title: '',
        author: '',
        genre: 'FANTASY',
        isbn: '',
        description: '',
        copies: 1,
        available: true,
      })
    } catch (err) {
      alert('Failed to create book')
      console.error(err)
    }
    console.log('Submitted Book:', formData)
  }

  if (isLoading) return <div className="p-6 text-center">Loading...</div>
  if (isError)
    return (
      <div className="p-6 text-center">Error getting server connection</div>
    )
  if (error) return <div className="p-6 text-center">Error creating book</div>
  if (isSuccess) alert('Book created successfully')

  return (
    <>
      <div className="bg-gray-900 p-4 text-white text-center font-bold text-3xl">
        Create New Book
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
            <option value="FANTASY">Fantasy</option>
            <option value="MYSTERY">Mystery</option>
            <option value="DRAMA">Drama</option>
            <option value="ROMANCE">Romance</option>
            <option value="SCI-FI">Sci-Fi</option>
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
            className="w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-900 cursor-pointer"
          >
            Submit Book
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateBook
