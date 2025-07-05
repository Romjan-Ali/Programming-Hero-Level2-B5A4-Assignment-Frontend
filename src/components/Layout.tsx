import { useState, type ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: (props: { isMenuTriggered: boolean }) => ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuTriggered, setIsMenuTriggered] = useState(false)
  return (
    <>
      <Navbar
        isMenuTriggered={isMenuTriggered}
        setIsMenuTriggered={setIsMenuTriggered}
      />
      <main>{children({ isMenuTriggered })}</main>
      <Footer />
    </>
  )
}

export default Layout
