import React from "react"

import { Check } from "lucide-react"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import Heading from "@/components/heading"
import ShinyButton from "@/components/shinyButton"
import MockDiscordUI from "@/components/mockDiscordUi"
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"
import DiscordMessage from "@/components/discord-message"

type Props = {}

const page = (props: Props) => {
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
           
            <div className="relative lg:row-span-2">
             
              <div className="absolute inset-px rounded-lg bg-white  lg:rounded-l-[2rem] " />
              {/*              
             
               This div is relatively positioned within the parent div, with a flexbox layout and overflow hidden
               The border radius is calculated by adding 1px to the theme's large border radius (theme(borderRadius.lg))
             */}
              <div className="relative flex h-full flex-col  overflow-hidden   rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)] ">
                <div className="px-8 pb-3  pt-8  sm:px-10  sm:pb-0 sm:pt-10">
                  <p className=" mt-2  text-lg/7  font-medium tracking-tight text-brand-950  max-lg:text-center ">
                  Real-Time Notifications 🔔</p>
                  <p className="mt-2  max-w-lg  text-sm/6  text-gray-600 max-lg:text-center ">
                  Get 
                   <span className="font-semibold">
                    {" "} Notified
                     </span> about critical  events  the moment they happen  , no matter if you are at home or on the go.

                  </p>

                </div>

              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section></section>
    </>
  )
}

export default page
