import { FREE_QUOTA, PRO_QUOTA } from "@/config";
import { db } from "@/db";
import { DiscordClient } from "@/lib/discord-cliend";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator";
import { UnknownTypedSql } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



const REQUEST_VALIDATOR = z.object({
    category: CATEGORY_NAME_VALIDATOR,
    fields: z.record(z.string().or(z.number()).or(z.boolean())).optional(),
    description: z.string().optional(),
}).strict()

// Nextjs POST REQUEST
export const POST = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get("Authorization")

        if (!authHeader) {
            return NextResponse.json({
                message: "Unauthorized user"
            },
                {
                    status: 401
                })
        }

        if (!authHeader.startsWith("Bearer")) {
            return NextResponse.json({
                message: "Invalid auth header format. Expected: 'Bearer <API_KEY>'"
            },
                {
                    status: 401
                })
        }
        // Bearer <API_KEY>
        const apiKey = authHeader.split(" ")[1]
        if (!apiKey || apiKey.trim() === "") {
            return NextResponse.json({
                message: "Invalid API Key"
            },
                {
                    status: 401
                })
        }

        const user = await db.user.findUnique({
            where: {
                apikey: apiKey
            },
            include: {
                eventCategories: true
            }
        })

        if (!user) {
            return NextResponse.json({
                message: "Invalid API_KEY"
            },
                { status: 401 })
        }

        if (!user.discordId) {
            return NextResponse.json({
                message: "Please enter your discord ID in your account settings",
            },
                {
                    status: 403
                })
        }

        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1
        const currentYear = currentDate.getFullYear()

        const quota = await db.quota.findUnique({
            where: {
                userId: user.id,
                month: currentMonth,
                year: currentYear
            },
        })

        const quotaLimit = user.plan === "FREE" ? FREE_QUOTA.maxEventsPerMonth : PRO_QUOTA.maxEventsPerMonth

        if (quota && quota.count >= quotaLimit) {
            return NextResponse.json({
                message: "Monthly quota limit reached. Please upgrade your plan for unlimited events.",
            },
                {
                    status: 429
                })
        }
        //discord bot token 
        const discord = new DiscordClient(process.env.DISCORD_BOT_TOKEN)
        const dmChannel = await discord.createDM(user.discordId)
        let requestData: unknown
        try {
            requestData = await req.json();



        } catch (error) {
            return NextResponse.json({
                message: "Invalida JSON request body"
            },

                {
                    status: 400
                })

        }
        //validate the requestData which is coming from the  end user.
        const validationResult = REQUEST_VALIDATOR.parse(requestData)

        const category = user.eventCategories.find((cat) => cat.name === validationResult.category)

        if (!category) {
            return NextResponse.json({
                message: `Oops!! You dont have a category named "${validationResult.category}". Please create a category first.`
            },
                {
                    status: 404
                })
        }
        const eventData = {

            title: `${category.emoji || "🔔"} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`,
            description: validationResult.description || ` A new  ${category.name} event has occured!!.`,
            color: category.color,
            timeStamp: new Date().toISOString(),
            fields: Object.entries(validationResult.fields || {}).map(([key, value]) => {
                return {
                    name: key,
                    value: String(value),
                    inline: true,
                }
            })

        }
        const event = await db.event.create({
            data: {
                name: category.name,
                formattedMessage: `${eventData.title}\n\n${eventData.description}`,
                userId: user.id,
                fields: validationResult.fields || {},
                eventCategoryId: category.id,
            }
        })

        try {

            await discord.sendEmbed(dmChannel.id, eventData)
            await db.event.update({
                where: { id: event.id },
                data: { deliveryStatus: "DELIVERED" }
            })

            await db.quota.upsert({
                where: {
                    userId: user.id,
                    month: currentMonth,
                    year: currentYear
                },
                update: {
                    count: {
                        increment: 1
                    }
                },
                create: {
                    userId: user.id,
                    month: currentMonth,
                    year: currentYear,
                    count: 1
                },

            })


        } catch (error) {
            await db.event.update({
                where: { id: event.id },
                data: {
                    deliveryStatus: "FAILED"
                }
            })
            console.log(error)
            return NextResponse.json({
                message: "Error Processing event",
                eventId: event.id,
            },
                {
                    status: 500
                })

        }

        return NextResponse.json({
            message: "Event processed successfully",
            eventId: event.id,
        })





    } catch (error) {
        console.error(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({
                message: error.message,
            }, {
                status: 422
            })
        }

        return NextResponse.json({
            message: "Internal Server Error Occured..",

        },
            {
                status: 500
            })

    }
}