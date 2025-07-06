import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetSomeBooksQuery } from '../redux/api/apiSlice'
import { MoveUpRight } from 'lucide-react'

interface MenuProps {
  isMenuTriggered: boolean
  setIsMenuTriggered: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = ({ isMenuTriggered, setIsMenuTriggered }: MenuProps) => {
  const navigate = useNavigate()
  const [textReady, setTextReady] = useState(false)

  const {
    data: randomBooks = [],
    isLoading,
    isError,
  } = useGetSomeBooksQuery({ limit: 6 })

  useEffect(() => {
    if (isMenuTriggered) {
      const timer = setTimeout(() => {
        setTextReady(true)
      }, 20)

      return () => clearTimeout(timer)
    } else {
      setTextReady(false)
    }
  }, [isMenuTriggered])

  const handleButtonClick = (linkTo: string) => {
    setIsMenuTriggered((prevState) => !prevState)
    navigate(linkTo)
  }

  if (isLoading) return <div className="p-6 text-center">Loading...</div>
  if (isError || !randomBooks)
    return <div className="p-6 text-center">Error loading book.</div>

  return (
    <div className="text-gray-600">
      <div
        className={`text-gray-600 transition-all duration-1000 transform ${
          textReady ? 'opacity-100 text-white' : 'opacity-0 text-gray-600'
        }`}
      >
        <div>
          <button
            onClick={() => handleButtonClick('/')}
            className="inline-flex items-center px-4 py-2 my-4 font-bold text-2xl cursor-pointer"
          >
            Home
            <span className="ml-6">
              <MoveUpRight size={24} />
            </span>{' '}
          </button>
        </div>
        <div>
          <button
            onClick={() => handleButtonClick('/books')}
            className="inline-flex items-center px-4 py-2 my-4 font-bold text-2xl cursor-pointer"
          >
            All Books{' '}
            <span className="ml-6">
              <MoveUpRight size={24} />
            </span>{' '}
          </button>
        </div>
        <div>
          <button
            onClick={() => handleButtonClick('/create-book')}
            className="inline-flex items-center px-4 py-2 my-4 font-bold text-2xl cursor-pointer"
          >
            Add Book{' '}
            <span className="ml-6">
              <MoveUpRight size={24} />
            </span>{' '}
          </button>
        </div>        
        <div>
          <button
            onClick={() => handleButtonClick('/borrow-summary')}
            className="inline-flex items-center px-4 py-2 my-4 font-bold text-2xl cursor-pointer"
          >
            Borrow Summary{' '}
            <span className="ml-6">
              <MoveUpRight size={24} />
            </span>{' '}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Menu
