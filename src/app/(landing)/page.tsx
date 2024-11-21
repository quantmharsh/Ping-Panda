import React from "react"

import { Check } from "lucide-react"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import Heading from "@/components/heading"
import ShinyButton from "@/components/shinyButton"
import MockDiscordUI from "@/components/mockDiscordUi"
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"
import DiscordMessage from "@/components/discord-message"
import Image from "next/image"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

type Props = {}

const page = (props: Props) => {
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
    method: "POST",
    body: JSON.stringify({
      category: "sale",
      fields: {
        plan: "PRO",
        email: "Quantam.Dev2001@email.com",
        amount: 49.00
      }
    }),
    headers: {
      Authorization: "Bearer <YOUR_API_KEY>"
    }
  })`
  return (
    <>
      <section className="relative py-24  sm:py-32  bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto  text-center flex flex-col items-center gap-10">
            <div>
              <Heading>
                <span>Real-Time SaaS Insights,</span>
                <br />

                <span className=" group relative  bg-gradient-to-r  from-brand-600 to-brand-800   bg-clip-text text-transparent">
                  Delivered to Your Discord
                  <div className="size-5 shrink-0 text-white transition-transform  mx-60 duration-300 ease-in-out group-hover:translate-x-[-200px]">
                    🚚
                  </div>
                </span>
              </Heading>
            </div>
            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              Ping-Panda🐼 simplifies SaaS monitoring with instant
              notifications. Stay updated on{" "}
              <span className="font-semibold text-gray-700">
                sales, new users, and other key events{" "}
              </span>
              delivered right to your Discord.
            </p>
            <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start">
              {[
                "Real-Time Discord alerts for critial events",
                "Buy Once , use forever",
                "Track sales , new users, or any other event",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex  gap-1.5 items-center text-left"
                >
                  <Check className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="w-full max-w-80">
              <ShinyButton
                href="/sign-up"
                className="relative  z-10  h-14 w-full text-base shadow-lg  transition-shadow  duration-300  hover:shadow-xl"
              >
                Start For Free Today
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      {/* Section for Discord UI */}
      <section className="bg-brand-25 pb-4 relative ">
        <div className=" absolute inset-x-0  bottom-24 left-5 right-5 top-24 rounded-2xl   bg-brand-700" />
        <div className="relative  mx-auto">
          <MaxWidthWrapper className="relative">
            <div className="-m-2  rounded-xl  bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 ">
              <MockDiscordUI>
                <AnimatedList>
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda Avatar"
                    username="PingPanda"
                    timestamp="Today at 13:45PM"
                    badgeText="SignUp"
                    badgeColor="#43b581"
                    title="👤 New user Signed Up"
                    content={{
                      Name: "Rohit Sharma",
                      Email: "Rohit264@gmail.com",
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda Avatar"
                    username="PingPanda"
                    timestamp="Today at 15:31PM"
                    badgeText="Revenue"
                    badgeColor="#faa61a"
                    title="💰 Payment Recived"
                    content={{
                      Amount: "₹749.49",
                      Email: "Virat49@gmail.com",
                      Plan: "Premium",
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda Avatar"
                    username="PingPanda"
                    timestamp="Today at 20:59PM"
                    badgeText="Delivered"
                    badgeColor="#d6a2e3"
                    title="📦 New Order Delivered"
                    content={{
                      Name: "MS Dhoni",
                      Address: "Chennai, India",
                      Email: "MSDhoni0007@gmail.com",
                    }}
                  />
                </AnimatedList>
              </MockDiscordUI>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
      {/* Section for Bento-Grid  */}
      <section className="relative py-24 sm:py-32  bg-brand-25">
        <MaxWidthWrapper className="flex flex-col  items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center  text-base/7 font-semibold  text-brand-600">
              Intutive Monitoring
            </h2>
            <Heading>Stay ahead with real-time insights</Heading>
          </div>
          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* First bento grid element  */}

            <div className=" group relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white  lg:rounded-l-[2rem] " />
              {/*              
            
              This div is relatively positioned within the parent div, with a flexbox layout and overflow hidden
              The border radius is calculated by adding 1px to the theme's large border radius (theme(borderRadius.lg))
             */}
              <div className="relative flex h-full flex-col  overflow-hidden   rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)] ">
                <div className="px-8 pb-3  pt-8  sm:px-10  sm:pb-0 sm:pt-10">
                  <p className=" mt-2  text-lg/7  font-medium tracking-tight text-brand-950  max-lg:text-center ">
                    Real-Time Notifications 🔔
                  </p>
                  <p className="mt-2  max-w-lg  text-sm/6  text-gray-600 max-lg:text-center ">
                    Get
                    <span className="font-semibold text-brand-700">
                      {" "}
                      Notified
                    </span>{" "}
                    about critical events the moment they happen , no matter if
                    you are at home or on the go.
                  </p>
                </div>

                <div className="relative min-h-[30rem] w-full  grow [container-type:inline-size] max-lg:mx-auto  max-lg:max-w-sm">
                  {/* cqw - container query width . this border radius is relative to the parent div which contains [container-type:inline-size] 
                  it is relative to  its parent .  child div shrinks or grows relative to its parent 

                 */}
                  <div className="absolute inset-x-0 bottom-0 top-10 overflow-hidden  rounded-t-[12cqw] border-x-[3cqw]  border-t-[3cqw]  border-gray-700 bg-gray-900  shadow-2xl">
                    <Image
                      className="size-full object-cover object-top"
                      src="/phone-screen.png"
                      alt="Phone Screen  Displaying app interface "
                      fill
                    />
                  </div>
                </div>
              </div>
              <div className=" pointer-events-none absolute inset-px rounded-lg shadow ring-4 ring-purple/5 lg:rounded-l-[2rem]  group-hover:ring-purple-300" />
            </div>

            {/* Second bento grid element */}
            <div className="  group relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"/>
              <div className="relative flex-h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                  Track Any Event 

                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center ">
                  From new <span className="text-purple-600 font-semibold">User</span>
                  {" "} signups to successful payments, 
                  <span className="font-semibold text-brand-700">PingPanda</span>
                  {" "} notifies you for all critical events in your 
                  <span className="font-semibold text-red-700">SaaS</span>.

                  </p>

                </div>
                <div className=" flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                  className="w-full max-lg:max-w-xs"
                  src="/bento-any-event.png"
                  alt="Bento box illustrating event tracking"
                  width={500}
                  height={300}
                  />

                </div>


              </div>
              <div className=" pointer-events-none absolute inset-px rounded-lg shadow ring-4 ring-purple/5 group-hover:ring-purple-300" />

            
            </div>
            {/* Third Bento Grid Element  */}
               <div className=" group relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                
                <div className="absolute inset-px rounded-lg bg-white"/>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg/7 font-medium tracking-tight    text-brand-950 max-lg:text-center ">
                    Track Any Properties

                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600  max-lg:text-center">
                    Add any custom data you like to an <span className="font-semibold text-brand-700"> Event</span> {" "}, such as a user email , a purchase amount or an exceeded quota limit.

                    </p>

                  </div>
                  <div className="flex flex-1 items-center justify-center px-8  max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                    <Image
                    className="w-full max-lg:max-w-xs"
                    src="/bento-custom-data.png"
                    alt="Bento box illustrating custom data tracking"
                    width={500}
                    height={300}
                    />


                  </div>
     
                </div>
                <div className=" pointer-events-none absolute inset-px rounded-lg shadow ring-4  ring-blue-300  group-hover:ring-purple-300" />

               </div>
               {/* Fourth Bento Grid Element */}

               <div className=" group relative lg:row-span-2">
                <div className=" absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"/>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                  <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                    <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Easy Integration 

                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600  max-lg:text-center">
                      Connect <span className="font-semibold text-brand-700">PingPanda</span>{" "}
                      with your existing workflows in minutes and call our intutive logging <span className="font-semibold text-purple-700"> API</span>{" "} from any  language.
                    </p>
                  </div>
                  <div className="relative min-h-[30rem] w-full grow">
                    <div className="absolute bottom-0 left-10 right-0  top-10 overflow-hidden rounded-tl-xl  bg-gray-900 shadow-2xl">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6  font-medium text-gray-400">
                      <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2  text-white">
                      Pingpanda.ts
                      </div>

                      </div>
                      
                      </div>
                      <div className="overflow-hidden">
                        <div className="max-h-[30rem]">
                        <SyntaxHighlighter
                          language="typescript"
                          style={{
                            ...oneDark,
                            'pre[class*="language-"]': {
                              ...oneDark['pre[class*="language-"]'],
                              background: "transparent",
                              overflow: "hidden",
                            },
                            'code[class*="language-"]': {
                              ...oneDark['code[class*="language-"]'],
                              background: "transparent",
                            },
                          }}
                        >
                          {codeSnippet}
                        </SyntaxHighlighter>

                        </div>
                        

                      </div> 
                    </div>

                  </div>
                  
                </div>

                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-4 ring-blue-300  group-hover:ring-purple-300 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />

               </div>
               
          </div>
        </MaxWidthWrapper>
      </section>
      
      <section></section>
    </>
  )
}

export default page
