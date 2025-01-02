"use client"
import { EventCategory } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { EmptyCategoryState } from "./empty-category-state"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { client } from "@/app/lib/client"
import{ColumnDef} from "@tanstack/react-table"




interface CategoryPageContentProps {
    hasEvents: boolean
    category: EventCategory
  }
export const CategoryPageContent=({
    hasEvents:initialHasEvents ,
    category,
}:CategoryPageContentProps)=>{


  const searchParams= useSearchParams()
  const[activeTab , setActiveTab]=useState<"today"|"week"|"month">("today");
  const page=parseInt(searchParams.get("page")||"1" ,10);
  const limit=parseInt(searchParams.get("limit")||"30" ,10);
  const[pagination ,setPagination]=useState({
    pageIndex:page-1,
    pageSize:limit,
  })

  const {data:pollingData}=useQuery({
    queryKey:["category" , category.name , "hasEvents"],
    initialData:{hasEvents:initialHasEvents},

  })

  const {data , isFetching}=useQuery({
    queryKey:["events", category.name , pagination.pageIndex , pagination.pageSize , activeTab,],
    queryFn:async()=>{
      const res =await client.category.getEventByCategoryName.$get({
        name:category.name ,
        page:pagination.pageIndex+1,
        limit:pagination.pageSize,
        timeRange:activeTab,

      })
      return await res.json();
    },
    refetchOnWindowFocus:false,
    enabled:pollingData?.hasEvents,
    
  })
  // const columns:ColumnDef<Event>[]=useMemo(
  //   ()=>[
     

  //   ]
  // )
  


  if(!pollingData.hasEvents)
  {
    return <EmptyCategoryState categoryName={category.name} />
    
  }
  return (
    <>
    <h1>
    
    </h1>
    </>
  )

}