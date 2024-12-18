import { db } from "@/db"
import { router } from "../__internals/router"
import { privateProcedure } from "../procedures"
import { startOfMonth } from "date-fns"
import { z } from "zod"
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"
import { parseColor } from "@/utils"

export const categoryRouter = router({
  //get(query) request to the backend .
  //c is context that we get from hono.js it has all the methods , features of Hono.js
  //ctx is a context that we pass. it consists info. that we have passed through middleware in procedure
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    //fetching categories that logged in  user  has created
    const categories = await db.eventCategory.findMany({
      where: { userId: ctx.user.id },
      select: {
        id: true,
        name: true,
        emoji: true,
        color: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
    //counting all the categories
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const now = new Date()
        const firstDayOfMonth = startOfMonth(now)
        const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
          db.event
            .findMany({
              where: {
                EventCategory: { id: category.id },
                createdAt: { gte: firstDayOfMonth },
              },
              select: {
                fields: true,
              },
              distinct: ["fields"],
              //creating set of unique fields for each category
            })
            .then((events) => {
              const fieldNames = new Set<string>()
              events.forEach((event) => {
                Object.keys(event.fields as Object).forEach((fieldName) => {
                  fieldNames.add(fieldName)
                })
              })
              return fieldNames.size
            }),
          //count total no. of events per category
          db.event.count({
            where: {
              EventCategory: { id: category.id },
              createdAt: { gte: firstDayOfMonth },
            },
          }),
          //last event that happen for particular category
          db.event.findFirst({
            where: { EventCategory: { id: category.id } },
            orderBy: { createdAt: "desc" },
            select: { createdAt: true },
          }),
        ])
        return {
          ...category,
          uniqueFieldCount,
          eventsCount,
          lastPing: lastPing?.createdAt || null,
        }
      })
    )

    //returning superjson because its easy to work with dates
    return c.superjson({ categories: categoriesWithCounts })
  }),
    deleteCategory:privateProcedure.input(
      z.object({name:z.string()})).mutation(async({c,input , ctx})=>{
        const{name}=input
        await db.eventCategory.delete({
          where:{ userId_name:{name , userId:ctx.user.id}} ,
        })
        return c.json({
          success:true 
        })
      }), 
createEventCategory :privateProcedure.input(z.object({
  name: CATEGORY_NAME_VALIDATOR,
  color: z
    .string()
    .min(1, "Color is required")
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
  emoji: z.string().emoji("Invalid emoji").optional(),
})
).mutation(async({c ,ctx,input})=>{

  const{user}=ctx;
  const{color , name , emoji}=input;
  //TODO:ADD PAID plan logic
  const eventCategory=await db.eventCategory.create({
    data:{
      name:name.toLowerCase(),
      color:parseColor(color) ,
      emoji ,
      userId:user.id
      

    },
  })

  return c.json({eventCategory})
})

})



