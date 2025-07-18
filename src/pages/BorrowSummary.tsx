import { useGetBorrowSummaryQuery } from '@/redux/api/apiSlice'

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery()

  if (isLoading) return <div className="p-6 text-center">Loading...</div>

  if (isError || !data)
    return <div className="p-6 text-center">Error loading Borrow Summary.</div>

  return (
    <>
      <div className="bg-gray-900 p-4 text-white text-center font-bold text-3xl">
        Borrow Summary
      </div>
      <div className="max-w-2xl w-full mx-auto p-6 bg-white shadow-md rounded">
        {data?.length === 0 ? (
          <p className="text-center text-gray-500">No borrowed books found.</p>
        ) : (
          <ul className="space-y-4">
            {data?.map((item, index) => (
              <li
                key={index}
                className="p-4 bg-neutral-100 rounded shadow-sm hover:shadow-md transition"
              >
                <div className="font-bold text-lg text-fuchsia-700">
                  {item.book.title}
                </div>
                <div className="text-sm text-gray-600">
                  ISBN: {item.book.isbn}
                </div>
                <div className="text-sm text-gray-800 mt-1">
                  Total Borrowed:{' '}
                  <span className="font-semibold">{item.totalQuantity}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default BorrowSummary
