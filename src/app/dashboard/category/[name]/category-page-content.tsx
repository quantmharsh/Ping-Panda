"use client"
import { EventCategory, Event } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { EmptyCategoryState } from "./empty-category-state"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { client } from "@/app/lib/client"
import { ColumnDef, ColumnFilter, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Row, SortingState, useReactTable } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { cn } from "@/utils"
import { isAfter, isToday, startOfMonth, startOfWeek } from "date-fns"




interface CategoryPageContentProps {
  hasEvents: boolean
  category: EventCategory
}
export const CategoryPageContent = ({
  hasEvents: initialHasEvents,
  category,
}: CategoryPageContentProps) => {


  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">("today");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "30", 10);
  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  })

  const { data: pollingData } = useQuery({
    queryKey: ["category", category.name, "hasEvents"],
    initialData: { hasEvents: initialHasEvents },

  })

  const { data, isFetching } = useQuery({
    queryKey: ["events", category.name, pagination.pageIndex, pagination.pageSize, activeTab,],
    queryFn: async () => {
      const res = await client.category.getEventByCategoryName.$get({
        name: category.name,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        timeRange: activeTab,

      })
      return await res.json();
    },
    refetchOnWindowFocus: false,
    enabled: pollingData?.hasEvents,

  })
  //since rendering colums  requires huge calculation so storing it in cache using useMemo . Changes only when dependenci array changes. Not update on re-render like useEffect
  const columns: ColumnDef<Event>[] = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "Category",
        cell: () =>
          <span>
            {category.name || "Uncategorized"}
          </span>
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => {
          console.log("what is column", column);
          return (
            <Button
              variant={"ghost"}
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")

              }
            >
              Date <ArrowUpDown className="ml-2 size-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          return new Date(row.getValue("createdAt")).toLocaleString()

        },
      },
      // remaining fields...
      ...(data?.events[0] ? Object.keys(data.events[0].fields as object).map((field) => ({
        accessorFn: (row: Event) =>
          (row.fields as Record<string, any>)[field],
        header: field,
        cell: ({ row }: { row: Row<Event> }) =>
          (
            row.original.fields as Record<string, any>
          )[field] || "-"


      })) : []),

      {
        accessorKey: "deliveryStatus",
        header: "Delivery Status",
        cell: ({ row }) => (
          <span
            className={cn("px-2 py-1 rounded-full text-xs  font-semibold", {
              "bg-green-100 text-green-800":
                row.getValue("deliveryStatus") === "DELIVERED",
              "bg-red-100 text-red-800":
                row.getValue("deliveryStatus") === "FAILED",
              "bg-yellow-100 text-yellow-800":
                row.getValue("deliveryStatus") === "PENDING",

            })}
          >
            {row.getValue("deliveryStatus")}


          </span>
        ),
      },

    ], [category.name, data?.events]
  )
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: data?.events || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.eventsCount || 0) / pagination.pageSize),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    }

  })
  // Update url when pagination changes
  const router = useRouter()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('page', (pagination.pageIndex + 1).toString());
    searchParams.set("limit", pagination.pageSize.toString());
    router.push(`?${searchParams.toString()}`, {
      scroll: false
    })
  }

    , [pagination, router])

    const numericFieldSums=useMemo(()=>{
 if(!data?.events ||data.events.length===0)
 {
  return {}
 }
  const sums:Record<string , {
    total:number,
    thisWeek:number,
    thisMonth:number,
    today:number
  }>={}
   const now=new Date();
   const weekStart=startOfWeek(now , {weekStartsOn:0});
   const monthStart=startOfMonth(now);
   data.events.forEach((event)=>{
    const eventDate= event.createdAt;
    Object.entries(event.fields as object).forEach(([field, value])=>{
      if(typeof value==="number")
      {
        if(!sums[field])
        {
          sums[field]={
            total:0,
            thisWeek:0,
            thisMonth:0,
            today:0
          }
        }
        sums[field].total+=value
        if(isAfter(eventDate , weekStart) || eventDate.getTime()===weekStart.getTime())
        {
          sums[field].thisWeek+=value
        }

        if(isAfter(eventDate , monthStart)|| eventDate.getTime()===monthStart.getTime())
        {
          sums[field].thisMonth+=value
        }

        if(isToday(eventDate)){
          sums[field].today+=value;
        }
      }


    })

   })
   return sums;


    },
    [data?.events])





  if (!pollingData.hasEvents) {
    return <EmptyCategoryState categoryName={category.name} />

  }
  return (
    <>
      <h1>

      </h1>
    </>
  )

}