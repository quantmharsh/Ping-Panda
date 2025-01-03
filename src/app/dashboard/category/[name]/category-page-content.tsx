"use client"
import { EventCategory,Event } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { EmptyCategoryState } from "./empty-category-state"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { client } from "@/app/lib/client"
import{ColumnDef, Row} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { cn } from "@/utils"




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
  //since rendering colums  requires huge calculation so storing it in cache using useMemo . Changes only when dependenci array changes. Not update on re-render like useEffect
  const columns:ColumnDef<Event>[]=useMemo(
    ()=>[
      {
        accessorKey:"category",
        header:"Category",
        cell:()=>
          <span>
            {category.name ||"Uncategorized"}
          </span>
      },
      {
        accessorKey:"createdAt",
        header:({column})=>{
          console.log("what is column",column);
          return(
            <Button
             variant={"ghost"}
             onClick={()=>column.toggleSorting(column.getIsSorted()==="asc")

             }
            >
              Date <ArrowUpDown className="ml-2 size-4"/>
            </Button>
          )
        },
        cell:({row})=>{
          return new Date(row.getValue("createdAt")).toLocaleString()

        },
      },
      // remaining fields...
      ...(data?.events[0] ? Object.keys(data.events[0].fields as object).map((field)=>({
        accessorFn:(row:Event)=>
        (row.fields as Record<string ,any>)[field],
        header:field,
        cell:({row}: {row:Row<Event>})=>
        (
          row.original.fields as Record<string , any>
        )[field] ||"-"


      })):[]),

      {
        accessorKey:"deliveryStatus",
        header:"Delivery Status",
        cell:({row})=>(
          <span
          className={cn("px-2 py-1 rounded-full text-xs  font-semibold",{
            "bg-green-100 text-green-800":
            row.getValue("deliveryStatus")==="DELIVERED",
            "bg-red-100 text-red-800":
            row.getValue("deliveryStatus")==="FAILED",
            "bg-yellow-100 text-yellow-800":
            row.getValue("deliveryStatus")==="PENDING",
            
          })}
          >
            {row.getValue("deliveryStatus")}


          </span>
        ),
      },

    ],[category.name , data?.events]
  )
  


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