"use client"
import { client } from "@/app/lib/client"
import LoadingSpinner from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { IdCard } from "lucide-react"
import Link from "next/link"
import { useState } from "react"


export const AccountSettings = ({
    discordId: initialDiscordId
}: {
    discordId: string
}) => {
    const [discordId, setDiscordId] = useState(initialDiscordId)

    const { mutate: updateDiscordId, isPending } = useMutation({
        mutationFn: async (discordId: string) => {
            const res = await client.project.setDiscordId.$post({ discordId })
            return await res.json();
        },

    })


    return (

        <Card className="max-w-xl w-full space-y-4">
            <div className="pt-2">
                <Label className="flex flex-row gap-1 w-full">
                    Discord Id  <IdCard  className="w-4 h-4"/>

                </Label>
                <Input
                    className="mt-1"
                    placeholder="Enter your discord Id here "
                    value={discordId}
                    onChange={(e) => setDiscordId(e.target.value)} />



            </div>
            <p className="mt-2 text-sm/6 text-gray-600">
                Don't know how to find your discord ID?{""}
                <Link href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID" className="text-brand-600 hover:text-purple-700">
                    Learn how to obtain it here

                </Link>
                .
            </p>
            <div className="pt-4">
                <Button onClick={() => updateDiscordId(discordId)}
                    disabled={isPending}
                >
                    {isPending ? (
                        <LoadingSpinner />
                    ) : "Save  changes"}

                </Button>

            </div>

        </Card>
    )
}