import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Books from './pages/Books'
import BorrowBook from './pages/BorrowBook'
import Authors from './pages/Authors'
import Author from './pages/Author'
import BookDetails from './pages/BookDetails'
import CreateBook from './pages/CreateBook'
import BorrowSummary from './pages/BorrowSummary'

const App = () => {
  return (
    <Layout>
      {({ isMenuTriggered }) => (
        <Routes>
          <Route
            path="/"
            element={<Home isMenuTriggered={isMenuTriggered} />}
          />
          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<BookDetails />} />
          <Route path="create-book" element={<CreateBook />} />
          <Route path="borrow/:bookId" element={<BorrowBook />} />
          <Route path="borrow-summary" element={<BorrowSummary />} />
          <Route path="authors" element={<Authors />} />
          <Route path="author/:id" element={<Author />} />
        </Routes>
      )}
    </Layout>
  )
}

export default App
