import { FREE_QUOTA, PRO_QUOTA } from "@/config";
import { db } from "@/db";
import { DiscordClient } from "@/lib/discord-cliend";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



const REQUEST_VALIDATOR=z.object({
    category:CATEGORY_NAME_VALIDATOR,
    fields:z.record(z.string().or(z.number()).or(z.boolean())).optional(),
    description:z.string().optional(),
}).strict()

// Nextjs POST REQUEST
export const POST=async(req:NextRequest)=>{
    try {
        const authHeader=req.headers.get("Authorization")

        if(!authHeader)
        {
            return NextResponse.json({
                message:"Unauthorized user"
            },
        {
            status:401
        })
        }

        if(!authHeader.startsWith("Bearer"))
        {
            return NextResponse.json({
                message:"Invalid auth header format. Expected: 'Bearer <API_KEY>'"
            },
        {
            status:401
        })
        }
    // Bearer <API_KEY>
        const apiKey=authHeader.split(" ")[1]
        if(!apiKey || apiKey.trim()==="")
        {
            return NextResponse.json({
                message:"Invalid API Key"
            } ,
        {
            status:401
        })
        }

        const user= await db.user.findUnique({
            where:{
                apikey:apiKey
            },
            include:{
                eventCategories:true
            }
        })

        if(!user)
        {
            return NextResponse.json({
                message:"Invalid API_KEY"
            },
        {status:401})
        }

        if(!user.discordId)
        {
            return NextResponse.json({
                message:"Please enter your discord ID in your account settings",
            },
        {
            status:403
        })
        }

        const currentDate= new Date()
        const currentMonth=currentDate.getMonth()+1
        const currentYear=currentDate.getFullYear()

        const quota=await db.quota.findUnique({
            where:{
                userId:user.id,
                month:currentMonth,
                year:currentYear
            },
        })

        const quotaLimit=user.plan==="FREE"?FREE_QUOTA.maxEventsPerMonth:PRO_QUOTA.maxEventsPerMonth

        if(quota && quota.count>=quotaLimit)
        {
            return NextResponse.json({
                message:"Monthly quota limit reached. Please upgrade your plan for unlimited events.",
            },
        {
            status:429
        })
        }
        //discord bot token 
        const discord=new DiscordClient(process.env.DISCORD_BOT_TOKEN)
        

    } catch (error) {
        
    }
}