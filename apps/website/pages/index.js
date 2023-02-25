import Link from "next/link";
import { useRef } from "react";

// ! Data
import features from "../assets/data/features";

// ! Components
import AppLayout from "../components/core/App";
import { Paragraph, SubTitle } from "../components/core/Prose";
import EmailForm from "../components/pages/index/FormEmail";

import LandingSection from "../components/pages/index/SectionLanding";

export default function Home() {
  const aboutSection = useRef();

  return (
    <AppLayout>
      <LandingSection aboutSection={aboutSection}/>
      <div className="py-20 px-8 mx-auto flex flex-col justify-center md:py-32 lg:py-52 container md:max-w-3xl text-center space-y-5 lg:max-w-6xl" ref={aboutSection}>
        <h2 className="text-secondary tracking-tight text-4xl font-medium font-heading mb-3 lg:mb-10 md:text-5xl lg:text-6xl">Welcome To The Chamomile Club</h2>
        <span className="text-2xl text-white tracking-tighter font-light">Taking poker to the next level. The invite only club has enjoyed many nights of casino chips, food and laughter. Founded by four friends in August 2021, <span className=" text-3xl font-heading">The Chamomile Club</span> was created to provide it's members with the greatest of food, learning and competition. Whether you're new to the game or a returning champ, the Founders have made it thier mission to give you the experience of the best poker nights around.</span>
        <Link
          href="/founders"
          className="underline text-white text-2xl font-light tracking-tighter w-min whitespace-nowrap mx-auto"
        >
          Meet the Founders

        </Link>
      </div>
      <div className="w-full bg-green-800 dark:bg-invertedLight shadow">
        <div className="w-full container max-w-2xl mx-auto py-20 px-8">
          <div className="flex flex-col space-y-5 md:space-y-8">
            {
              features.map((feature, index) => (
                <div className="flex items-center space-x-4" key={`$Feature-${index}`}>
                  <feature.Chip className="h-auto rounded-full shadow-lg w-1/5"/>
                  <div className="space-y-2 w-4/5">
                    <SubTitle>{ feature.title }</SubTitle>
                    <Paragraph>{ feature.description }</Paragraph>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="w-full py-20 shadow md:py-32 lg:py-52">
        <div className="mx-auto container flex flex-col px-8 items-center md:space-x-8 md:max-w-3xl md:px-12 md:flex-row lg:max-w-6xl">
            <div className="flex flex-col flex-grow mb-5 w-full md:w-1/2 md:mb-0">
              <span className="text-secondary text-4xl font-medium font-heading mb-2 md:text-5xl lg:text-6xl">Interested In The Movement?</span>
              <span className="text-2xl text-white tracking-tighter font-light">Sign up below to get the latest updates on <span className="text-3xl font-heading">The Chamomile Club</span>.</span>
            </div>
            <EmailForm/>
          </div>
      </div>
    </AppLayout>
  )
}
