import React from "react"

import { Check } from "lucide-react"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import Heading from "@/components/heading"
import ShinyButton from "@/components/shinyButton"
import MockDiscordUI from "@/components/mockDiscordUi"

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
              <MockDiscordUI />
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
      <section></section>
      <section></section>
    </>
  )
}

export default page
