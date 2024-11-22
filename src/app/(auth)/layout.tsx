import Navbar from '@/components/navbar'
import { ReactNode } from 'hono/jsx'
import React from 'react'


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