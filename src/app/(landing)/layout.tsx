import { ReactNode } from 'hono/jsx'
import React from 'react'
import Navbar from '../components/navbar'

type Props = {}

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <>
    <Navbar/>
    {children}
  </>
  )
}

export default Layout