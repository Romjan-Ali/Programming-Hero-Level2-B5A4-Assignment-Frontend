import React, { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { useGetAllBooksQuery } from '../redux/api/apiSlice'
import { useNavigate } from 'react-router-dom'

interface Book {
  _id: string
  title: string
  author: string
}

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: books = [], isLoading, isError } = useGetAllBooksQuery()
  const navigate = useNavigate()

  const fuse = useMemo(() => {
    if (!books || books.length === 0) return null

    return new Fuse<Book>(books, {
      keys: ['title'],
      includeScore: true,
      threshold: 0.3,
    })
  }, [books])

  const results: Book[] = useMemo(() => {
    if (!fuse || !searchTerm) return books.slice(0, 10)
    return fuse.search(searchTerm).map((res) => res.item).slice(0, 10)
  }, [fuse, searchTerm, books])

  const handleItemClick = (id: string) => {
    navigate(`/books/${id}`)
  }

  if (isLoading) return <p className="text-center mt-10 text-gray-600">Loading books...</p>
  if (isError) return <p className="text-center mt-10 text-red-600">Failed to load books.</p>

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">📚 Book Search</h1>

      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search books by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />

        <ul className="mt-6 space-y-3">
          {results.length > 0 ? (
            results.map((book) => (
              <li
                key={book?._id}
                onClick={() => handleItemClick(book?._id)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleItemClick(book?._id)}
                className="cursor-pointer p-4 bg-white rounded-lg shadow-sm border hover:bg-blue-50 transition duration-150 outline-none focus:ring-2 focus:ring-blue-400"
              >
                <p className="text-lg font-medium text-gray-800">{book.title}</p>
                <p className="text-sm text-gray-500">by {book.author}</p>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No results found.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default SearchPage
