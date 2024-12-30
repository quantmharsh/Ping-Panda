import Navbar from '@/components/navbar'

import React, { ReactNode } from 'react'


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