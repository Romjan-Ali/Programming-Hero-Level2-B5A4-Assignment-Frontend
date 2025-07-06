import { useState, type ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Menu from './Menu'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuTriggered, setIsMenuTriggered] = useState(false)

  return (
    <>
      <div className='min-h-lvh'>
        <Navbar
          isMenuTriggered={isMenuTriggered}
          setIsMenuTriggered={setIsMenuTriggered}
        />
        {isMenuTriggered ? (
          <Menu
            isMenuTriggered={isMenuTriggered}
            setIsMenuTriggered={setIsMenuTriggered}
          />
        ) : (
          <main>{children}</main>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Layout
