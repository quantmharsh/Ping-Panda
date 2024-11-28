import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";


export const categoryRouter=router({
  //get(query) request to the backend . 
  //c is context that we get from hono.js it has all the methods , features of Hono.js
  //ctx is a context that we pass. it consists info. that we have passed through middleware in procedure
    getEventCategories:privateProcedure.query(async({c,ctx})=>{
 
       
        return c.json({})

    })

})