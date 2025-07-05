import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.png'
import { Menu, Search, SeparatorVertical, X } from 'lucide-react'

interface NavbarProps {
  isMenuTriggered: boolean
  setIsMenuTriggered: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({ isMenuTriggered, setIsMenuTriggered }: NavbarProps) => {
  const handleMenuClick = () => {
    setIsMenuTriggered((prevState) => !prevState)
  }
  return (
    <>
      <div
        className={`absolute w-full -z-10 transition-[height] duration-500 ease-in-out ${
          isMenuTriggered ? 'bg-gray-600 h-screen' : 'h-0'
        }`}
      ></div>
      <header>
        <div className="max-xl:px-4 min-xl:px-24 py-4 flex justify-between items-center uppercase">
          <div>
            <Link to="/">
              <img src={logo} alt="Image Library Logo" className="w-52" />
            </Link>
          </div>
          <nav className="max-lg:hidden flex justify-between items-center">
            <Link className="mx-4 relative inline-block group" to="/">
              <span className="relative">Home</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link className="mx-4 relative inline-block group" to="/books">
              <span className="relative">Browse Books</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full"></span>{' '}
            </Link>
            <Link
              className="mx-4 relative inline-block group"
              to="/create-book"
            >
              <span className="relative">Create Book</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link className="mx-4 relative inline-block group" to="/authors">
              <span className="relative">Authors</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link
              className="mx-4 relative inline-block group"
              to="/borrow-summary"
            >
              <span className="relative">Borrow Summary</span>
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full"></span>{' '}
            </Link>
            <div>
              <SeparatorVertical className="text-gray-400" />
            </div>
            <Link className="mx-4" to="/search">
              <Search />
            </Link>
          </nav>
          <div className="min-lg:hidden">
            <nav className="flex justify-between items-center">
              <button onClick={handleMenuClick} className="cursor-pointer">
                {isMenuTriggered ? (
                  <div className="flex items-center">
                    <span className="text-gray-300 mr-2">Close</span>
                    <span className="rotate-0 hover:rotate-180 transition-transform duration-300 text-white">
                      <X size={32} className="text-2xl" />
                    </span>
                  </div>
                ) : (
                  <Menu />
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
