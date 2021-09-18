import { useRef } from "react";

// ! Data
import features from "../assets/data/features";

// ! Components
import AppLayout from "../components/core/App";
import { Paragraph, SubTitle } from "../components/core/Prose";
import EmailForm from "../components/pages/index/FormEmail";

import LandingSection from "../components/pages/index/SectionLanding";

export default function Home() {
  const featuresSection = useRef();

  return (
    <AppLayout>
      <LandingSection featuresSection={featuresSection}/>
      <div
        className="w-full bg-green-800 dark:bg-invertedLight shadow"
        ref={featuresSection}
      >
        <div className="w-full container max-w-xl mx-auto py-20 px-8">
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
