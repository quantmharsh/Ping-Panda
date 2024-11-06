import { cn } from '@/utils';
import React, { HTMLAttributes, ReactNode } from 'react'


//extending HTMLAttributes because we  can pass all the header props here .(properties oof h1, h2 tag)
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>  {
    children?:ReactNode, 
    className?:string ,

}

const Heading = ({children , className , ...props}: HeadingProps) => {
  return (
     <h1 className={ cn("text-4xl sm:text-5xl  text-pretty  font-heading font-semibold tracking-tight  text-zinc-800" ,className)}{...props}>
        {children}
     </h1>
  )
}

export default Heading;