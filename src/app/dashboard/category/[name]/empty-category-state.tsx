"use client"
import { client } from "@/app/lib/client"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export const EmptyCategoryState = ({
    categoryName,
}: {
    categoryName: string
}) => {
    const router = useRouter()

    const { data } = useQuery({
        queryKey: ["category", categoryName, "hasEvents"],
        queryFn: async () => {
            const res = await client.category.pollCategory.$get({
                name: categoryName,
            })
            return await res.json()
        },
        refetchInterval(query) {
            return query.state.data?.hasEvents ? false : 1000
        },
    })
    const hasEvents = data?.hasEvents
    useEffect(() => {
        if (hasEvents) {
            router.refresh()
        }
    }, [hasEvents, router])
    const codeSnippet = `await fetch('http://localhost:3000/api/v1/events', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer <YOUR_API_KEY>'
        },
        body: JSON.stringify({
          category: '${categoryName}',
          fields: {
            field1: 'value1', // for example: user id
            field2: 'value2' // for example: user email
          }
        })
      })`

    return (
        <Card
            contentClassName="max-w-2xl w-full flex flex-col items-center p-6"
            className="flex-1 flex items-center justify-center "
        >
            <h2 className="text-xl/8 font-medium text-center tracking-tight text-gray-950">
                Create your first {categoryName} event
            </h2>
            <p className="text-sm/6 text-gray-600 mb-8 max-w-md text-center text-pretty">
                Get started by sending a request to our tracking API:
            </p>
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg  overflow-hidden ">
                <div className="bg-gray-800 px-4 py-2 flex justify-between items-center ">
                    <div className="flex space-x-2">
                        <div className="size-3 rounded-full bg-red-500" />
                        <div className="size-3 rounded-full bg-yellow-500" />
                        <div className="size-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-gray-400 text-sm">
                        first-{categoryName}-event.ts
                    </span>
                </div>
                <SyntaxHighlighter
                    language="typescript"
                    style={atomDark}
                    customStyle={{
                        borderRadius: "0px",
                        margin: 0,
                        padding: "1rem",
                        fontSize: "0.875rem",
                        lineHeight: "1.5",
                    }}
                >
                    {codeSnippet}
                </SyntaxHighlighter>
            </div>
            <div className="mt-8 flex flex-col items-center space-x-2 ">
                <div className="flex gap-2 items-center">
                    <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-600">
                        Listening 👂 for incoming events...
                    </span>
                </div>
                <p className="text-sm/6 text-gray-600 mt-2">
                    Need help ? check out our{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        documentation
                    </a>{" "}
                    or{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        contact support 📞
                    </a>
                    .
                </p>
                <p className="text-sm/6 text-gray-600 mt-4 text-center">
                    <strong>Note:</strong> Before proceeding, please ensure you have added our Discord bot to your server.{" "}
                    <a
                        href="https://discord.com/oauth2/authorize?client_id=1322597285850517637&permissions=2048&scope=bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Add PingPanda Bot
                    </a>
                </p>
            </div>
        </Card>
    )
}
