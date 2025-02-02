import { currentUser } from "@clerk/nextjs/server"
import { router } from "../__internals/router"
import { publicProcedure } from "../procedures"
import { db } from "@/db"

// auth router
export const authRouter = router({
    //GET request to get the status of the database. "/api/auth/getDatabaseSyncStatus"
    //ctx => context  that we get from middleware
    getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {
        const auth = await currentUser()
        // console.log('AUTH data:', auth);
        if (!auth) {
            // console.log("No auth Data Recived")
            return c.json({
                isSynced: false,
            })
        }
        const user = await db.user.findFirst({
            where: { externalId: auth.id },
        })
               

        //Sync Clerk  User with Db
        if (!user) {
            // console.log("User not synced with DB")
            await db.user.create({
                data: {
                    quotaLimit: 100,
                    externalId: auth.id,
                    email: auth.emailAddresses[0].emailAddress,
                },
            })
            // return c.json({
            //     isSynced: true,
            // })
        }
        // console.log("synched user to db")
        return c.json({
            isSynced: true,
        })
    }),
})
