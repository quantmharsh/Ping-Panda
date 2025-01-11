"use client"
import { client } from "@/app/lib/client";
import { Card } from "@/components/ui/card";
import { Plan } from "@prisma/client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { BarChart3Icon } from "lucide-react";
import { useRouter } from "next/navigation";


export const UpgradePageContent = ({ plan }: { plan: Plan }) => {

    const router = useRouter();

    const { mutate: createCheckoutSession } = useMutation({
        mutationFn: async () => {
            const res = await client.payment.createCheckoutSession.$post()
            return await res.json()
        },
        onSuccess: ({ url }) => {
            if (url) {
                router.push(url)
            }
        }
    })

    const { data: usageData } = useQuery({
        queryKey: ["usage"],
        queryFn: async () => {
            const res = await client.project.getUsage.$get()
            return await res.json()
        },

    })

    return (
        <div className="max-w-3xl flex flex-col gap-8">
            <div>
                <h1 className="mt-2 text-xl/8  font-medium  tracking-tight  text-gray-900">
                    {plan === "PRO" ? "Plan:Pro🚀" : "Plan:Free🥶"}

                </h1>
                <p className="text-sm/5 text-gray-600 max-w-prose">
                    {plan === "PRO"
                        ? "Thank you for choosing PingPanda PRO! Your enhanced usage limits and exclusive features are now active. 🚀"
                        : "Upgrade to PingPanda PRO to unlock expanded access, additional categories, and priority support tailored to your needs."}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 border-brand-700">
                    <div className="flex flex-row items-center  justify-between space-y-0 pb-2">
                        <p className="text-sm/6 font-medium">
                            Total Events

                        </p>
                        <BarChart3Icon className="size-4 text-muted-foreground" />

                    </div>
                    <div>
                        <p className="text-2xl font-bold">
                            {
                                usageData?.eventsUsed || 0
                            } of {" "}
                            {
                                usageData?.eventsLimit || 100
                            }

                        </p>
                        <p className="text-xs/5 text-muted-foreground">
                            Events overview for the current cycle

                        </p>

                    </div>

                </Card>
                <Card>
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <p className="text-sm/6 font-medium">Event Categories</p>
                        <BarChart3Icon className="size-4 text-muted-foreground" />
                    </div>

                    <div>
                        <p className="text-2xl font-bold">
                            {usageData?.categoriesUsed || 0} of{" "}
                            {usageData?.categoriesLimit.toLocaleString() || 10}
                        </p>
                        <p className="text-xs/5 text-muted-foreground">Active categories</p>
                    </div>
                </Card>

            </div>

            <p className="text-sm text-gray-500">
                Usage resets{" "}
                {usageData?.resetDate ? (
                    format(usageData.resetDate, "MMM d, yyyy")
                ) : (
                    <span className="animate-pulse w-8 h-4 bg-gray-200"></span>
                )}.
                {plan !== "PRO" && (
                    <span
                        onClick={() => createCheckoutSession()}
                        className="inline cursor-pointer underline text-brand-600"
                    >
                        {" "}
                        Upgrade now to unlock higher limits &rarr;
                    </span>
                )}
            </p>

        </div>
    )
}