import { cn } from '@/utils'
import React, { ReactNode } from 'react'

type  MaxWidthWrapperProps = {
    children?:ReactNode,
    className?:string 
}

const MaxWidthWrapper = ({children , className}: MaxWidthWrapperProps) => {
  return (
    <div className={cn("h-full w-full mx-auto  max-w-screen-xl px-2.5 md:px-20" , className)} >{children}</div>
  )
}

export default  MaxWidthWrapper;