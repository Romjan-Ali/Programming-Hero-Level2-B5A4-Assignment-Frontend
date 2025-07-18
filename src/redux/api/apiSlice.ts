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

const base_url =
  import.meta.env.VITE_NODE_ENV !== 'development'
    ? import.meta.env.VITE_BASE_URL
    : 'http://localhost:4252/api'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  tagTypes: ['FilteredBooks', 'Book', 'SomeBooks', 'BorrowSummary'],
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], void>({
      query: () => '/books',
      transformResponse: (res: { data: Book[] }) => res.data,
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (res: { data: Book }) => res.data,
      providesTags: ['Book'],
    }),
    getSomeBooks: builder.query<Book[], { limit: number }>({
      query: ({ limit }) => `/books/?limit=${limit}`,
      transformResponse: (res: { data: Book[] }) => res.data,
      providesTags: ['SomeBooks'],
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
      providesTags: ['FilteredBooks'],
      // transformResponse: (res: { data: Book[] }) => res.data,
      transformResponse: (res: { data: Book[] | [] }) =>
        Array.isArray(res) ? res : res.data,
    }),
    getAllGenres: builder.query<string[], void>({
      query: () => '/books/genres',
      transformResponse: (res: GenreResponse) => res.data,
      providesTags: ['FilteredBooks'],
    }),
    getAllAuthors: builder.query<string[], void>({
      query: () => '/books/authors',
      transformResponse: (res: UniqueAuthorsResponse) => res.data,
      providesTags: ['FilteredBooks'],
    }),
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['FilteredBooks'],
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
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation<DeleteBookResponse, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FilteredBooks', 'SomeBooks'],
    }),
    getBorrowSummary: builder.query<BorrowSummaryItem[], void>({
      query: () => '/borrow',
      transformResponse: (res: BorrowSummaryResponse) => res.data,
      providesTags: ['BorrowSummary'],
    }),
    borrowBook: builder.mutation<
      { message: string },
      { book: string; quantity: number; dueDate: string }
    >({
      query: (body) => ({
        url: '/borrow',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BorrowSummary'],
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
  useUpdateBookMutation,
} = apiSlice
