import { router } from "../__internals/router";
import { publicProcedure } from "../procedures";

// auth router  
export const authRouter=router({
    //GET request to get the status of the database. "/api/auth/getDatabaseSyncStatus"
    getDatabaseSyncStatus:publicProcedure.query(({c})=>{
        return c.json({
            status:"success"
        })
    })
})