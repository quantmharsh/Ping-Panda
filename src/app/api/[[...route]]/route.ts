import { httpHandler } from "@/server"
//need to remove edge No Money no honey. Uses more then 1 MB which is limit for vercel
// export const runtime = "edge"

export { httpHandler as GET, httpHandler as POST }
