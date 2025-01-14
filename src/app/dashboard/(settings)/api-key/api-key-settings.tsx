"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircleIcon, ClipboardListIcon } from "lucide-react";
import { useState } from "react";


export const ApiKeySettings=({apikey}:{
    apikey:string
})=>{

    const[copySuccess ,setCopySuccess]=useState(false);

    const copyApiKey=()=>{
        navigator.clipboard.writeText(apikey)
        setCopySuccess(true);
        setTimeout(()=> setCopySuccess(false) , 2000)
    }

    return(
       <Card className="max-w-xl w-full">
        <div>
        <Label> Your API Key
            </Label>      
            <div className="mt-1 relative">
                <Input type="password" value={apikey}readOnly/>
                <div className="absolute space-x-0.5 inset-y-0 right-0 flex items-center">
                    <Button 
                    variant={"ghost"}
                    onClick={copyApiKey}
                    className="p-1 w-10 focus:outline-none focus:ring-2 focus-ring-brand-500 "
                    >
                        {copySuccess?
                        (
                            <CheckCircleIcon className="size-4 text-brand-900"/>
                        ):(
                            <ClipboardListIcon className="size-4  text-brand-900"/>
                        )
                        }

                    </Button>

                </div>
                </div>   
                <p className="mt-2 text-sm/6 text-gray-600">
    Shh🤫... your key is like your diary—keep it secret, keep it safe, and definitely don't let nosy people peek! 😉
</p>
 
        </div>

       </Card>
    )
}