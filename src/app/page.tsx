import React from 'react'
import MaxWidthWrapper from './components/max-width-wrapper'
import Heading from './components/heading'

type Props = {}

const page = (props: Props) => {
  return (
    <>
     <section className='relative py-24  sm:py-32  bg-brand-25'>
<MaxWidthWrapper className='text-center'>
   <div className='relative mx-auto  text-center flex flex-col items-center gap-10'>
    <div>
      <Heading>
        <span>
        Real-Time SaaS Insights,
        </span>
        <br/>
        <span  className='relative  bg-gradient-to-r  from-brand-600 to-brand-800   bg-clip-text text-transparent'>
          Delivered to Your Discord 
        </span>
    🚚
      </Heading>
    </div>

   </div>
</MaxWidthWrapper>

     </section>
     <section></section>
     <section></section>
     <section></section>
  
  </>
  )

}

export default page