import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Books from './pages/Books'
import BorrowBook from './pages/BorrowBook'
import Author from './pages/Author'
import BookDetails from './pages/BookDetails'
import CreateBook from './pages/CreateBook'
import BorrowSummary from './pages/BorrowSummary'
import Search from './pages/Search'
import EditBook from './pages/EditBook'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:id" element={<BookDetails />} />
        <Route path="create-book" element={<CreateBook />} />
        <Route path="borrow/:bookId" element={<BorrowBook />} />
        <Route path="borrow-summary" element={<BorrowSummary />} />
        <Route path="author/:id" element={<Author />} />
        <Route path="search" element={<Search />} />
        <Route path="edit-book/:id" element={<EditBook />} />
      </Routes>
    </Layout>
  )
}

export default App
