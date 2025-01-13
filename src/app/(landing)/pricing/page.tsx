"use client"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


const Page=()=>{
    const{user}=useUser();
    const router=useRouter();
    const INCLUDED_FEATURES=[
        "10,000 real-time events per month",
        "10 Event categories",
        "Advanced analytics and insights",
        "Priority support"
    ]
    const{}=useMutation(
        {
            
        }
    );

}
export default Page