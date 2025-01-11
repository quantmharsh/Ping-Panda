import DashboardPage from '@/components/dashboard-page';
import { db } from '@/db';
import { currentUser } from '@clerk/nextjs/server'
import { redirect, useRouter } from 'next/navigation';
import React from 'react'
import DashboardPageContent from './dashboard-page-content';
import { CreateEventCategoryModal } from '@/components/create-event-category-modal';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

type Props = {}


//if user is not logged in then redirect to sign in page
const page = async(props: Props) => {
   const auth = await currentUser();
  //  const router=useRouter();
  //  console.log("Auth Data in dashboard page" ,auth)
   if(!auth)
   {
    // console.log("no auth data" ,auth)
    redirect("/sign-in");
   }
   const user = await db.user.findUnique({
    where:{externalId:auth.id}
   })
  //  console.log("user ?" ,user)
   if(!user)
   {
    // console.log("no user")
    redirect("/sign-in");
   }
  return (
    <div>
      <DashboardPage title="Dashboard" hideBackButton={true}
      cta={
        <CreateEventCategoryModal>
          <Button className='w-full sm:w-fit'>
            <PlusIcon className='size-4 mr-2'/>
            Add Category
          </Button>
        </CreateEventCategoryModal>
      }
      >
        
       
          {/* Rendering client side component inside server side component  */}
        <DashboardPageContent />
        </DashboardPage>
       </div>
  )
}

export default page