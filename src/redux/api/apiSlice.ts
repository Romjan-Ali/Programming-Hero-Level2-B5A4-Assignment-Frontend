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

export interface DeleteBookResponse {
  success: boolean
  message: string
  data: null
}

export interface BorrowSummaryItem {
  totalQuantity: number
  book: {
    title: string
    isbn: string
  }
}

export interface BorrowSummaryResponse {
  success: boolean
  message: string
  data: BorrowSummaryItem[]
}

export interface GenreResponse {
  success: boolean
  message: string
  data: string[]
}

export interface UniqueAuthorsResponse {
  success: boolean
  message: string
  data: string[]
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://programming-hero-level2-b5-a4-assig.vercel.app/api',
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
      {
        filter: string
        author: string
        sortBy: string
        sort: string
        limit: number
      }
    >({
      query: ({ filter, author, sortBy, sort, limit }) => {
        const params = new URLSearchParams()
        if (filter) params.append('filter', filter)
        if (author) params.append('author', author)
        if (sortBy) params.append('sortBy', sortBy)
        if (sort) params.append('sort', sort)
        if (limit) params.append('limit', limit.toString())
        return `/books/?${params.toString()}`
      },
      transformResponse: (res: { data: Book[] }) => res.data,
    }),
    getAllGenres: builder.query<string[], void>({
      query: () => '/books/genres',
      transformResponse: (response: GenreResponse) => response.data,
    }),
    getAllAuthors: builder.query<string[], void>({
      query: () => '/books/authors',
      transformResponse: (response: UniqueAuthorsResponse) => response.data,
    }),

    createBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
    }),
    deleteBook: builder.mutation<DeleteBookResponse, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
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
    getBorrowSummary: builder.query<BorrowSummaryItem[], void>({
      query: () => '/borrow',
      transformResponse: (res: BorrowSummaryResponse) => res.data,
    }),
    updateBook: builder.mutation<
      Book,
      { id: string; updatedData: Partial<Book> }
    >({
      query: ({ id, updatedData }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: updatedData,
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
  useDeleteBookMutation,
  useGetBorrowSummaryQuery,
  useGetAllGenresQuery,
  useGetAllAuthorsQuery,
  useUpdateBookMutation
} = apiSlice
