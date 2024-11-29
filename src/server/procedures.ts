
import { db } from "@/db";
import { j } from "./__internals/j"
import { currentUser } from "@clerk/nextjs/server";
import { HTTPException } from "hono/http-exception";

const authMiddleware=j.middleware(async({c,next})=>{
    const authHeader=c.req.header("Authorization");
    if(authHeader)
    {
        //get api key from header   Bearer <API_KEY>
        const apiKey= authHeader.split(" ")[1];
        //get user from api key
        const  user= await db.user.findUnique({
            where:{apikey:apiKey},
        })
        //got user in our db
        if(user)
        {
            return next({user});
        }
        
    }
    //if no api key in header but  user is signed in using clerk
    const auth =await currentUser();
    if(!auth)
    {
        throw new HTTPException(401, {message:"Unauthorized user"})
    }
    //get user from  db
    const user =await db.user.findUnique({
        where:{externalId:auth.id} ,
    })
    if(!user)
    {
        throw new HTTPException(401, {message:"Unauthorized user"})
    }
  
return  next({user});
})
/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const baseProcedure = j.procedure
export const publicProcedure = baseProcedure;
export const privateProcedure= publicProcedure.use(authMiddleware);
