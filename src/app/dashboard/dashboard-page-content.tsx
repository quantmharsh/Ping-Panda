"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { client } from '../lib/client'
import LoadingSpinner from '@/components/loading-spinner'

type Props = {

}



const DashboardPageContent = (props: Props) => {


const {data:categories , isPending:isEventCategoriesLoading}=useQuery({
  queryKey:["user-event-categories"],
  queryFn:async()=>{
    const res=await client.category.getEventCategories.$get()
    const{categories}=await res.json()
    return categories

  }
})


if(isEventCategoriesLoading)
{
  return(
    <div className='flex items-center justify-center flex-1 h-full w-full'>
      <LoadingSpinner size='md'/>

    </div>
  )
}

  return (
    <div>dashboard-page-content</div>
  )
}

export default  DashboardPageContent 