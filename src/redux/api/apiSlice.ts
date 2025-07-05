import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Book {
  _id: string
  title: string
  author: string
  genre: string
  isbn: string
  description: string
  copies: number
  imageUrl?: string
  available: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4252/api',
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], void>({
      query: () => '/books',
      transformResponse: (response: { data: Book[] }) => response.data,
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { data: Book }) => response.data,
    }),
    getSomeBooks: builder.query<Book[], { limit: number }>({
      query: ({ limit }) => `/books/?limit=${limit}`,
      transformResponse: (res: { data: Book[] }) => res.data,
    }),
    getFilteredBooks: builder.query<
      Book[],
      { filter: string; sortBy: string; sort: string; limit: number }
    >({
      query: ({ filter, sortBy, sort, limit }) =>
        `/books/?filter=${filter}&sortBy=${sortBy}&sort=${sort}&limit=${limit}`,
      transformResponse: (res: { data: Book[] }) => res.data,
    }),
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
    }),
    borrowBook: builder.mutation<
      { message: string }, // Response type
      { book: string; quantity: number; dueDate: string } // Request body type
    >({
      query: (body) => ({
        url: '/borrow',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useBorrowBookMutation,
  useGetFilteredBooksQuery,
  useGetSomeBooksQuery,
  useCreateBookMutation,
} = apiSlice
