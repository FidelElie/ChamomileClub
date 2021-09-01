// ! Data
import openings from "../assets/data/openings";

// ! Components
import AppLayout from "../components/layouts/App";
import { PageHeader, Paragraph, SubTitle } from "../components/core/Prose";
import Accordion from "../components/misc/Accordion";
import ApplicationForm from "../components/pages/Application.form";

export default function Jobs() {
  return (
    <AppLayout title="The Chamomile Club | Jobs" navbarFixed>
      <div className="w-full container max-w-4xl mx-auto px-8 pt-28 pb-10 md:px-0">
        <PageHeader
          title="Jobs"
          tagline="Are you interested in joining the movement? See our open positions below."
        />
        <SubTitle>Information</SubTitle>
        <Paragraph>All our positions possess a three stage interview process starting with an inital call with one of founders, a technical interview follwed finally by a final video call with the founders. Salary to be negotiated on recieving an offer. You cna also expect many benefits:</Paragraph>
        <div className="flex flex-col my-5 space-y-2">
          <span className="text-white font-light">Food Provided</span>
          <span className="text-white font-light">Flexible Hours</span>
          <span className="text-white font-light">Friendly Work Environment</span>
          <span className="text-white font-light">Potential To Buy In*</span>
        </div>
        <span className="mb-2 text-xs text-white">* Potential of buy-in for staff is contigent on guest list and subject to change.</span>
        <SubTitle>Positions</SubTitle>
        <div className="my-5 flex flex-col w-full space-y-4">
          {
            openings.map(opening => (
              <Accordion header={opening.name} key={`${opening.name}-accordion`}>
                <div className="flex flex-col">
                  <span className="mb-5">{opening.description}</span>
                  <span className="text-lg mb-1 tracking-tighter">Responsibilities</span>
                  <ul className="ml-5 list-disc mb-4">
                    {
                      opening.responsibilities.map((responsibility, index) => (
                        <li
                          className="text-sm"
                          key={`${opening.name}-responsibility-${index}`}>
                          {responsibility}
                        </li>
                      ))
                    }
                  </ul>
                  <span className="text-lg mb-1 tracking-tighter">Desirables</span>
                  <ul className="ml-5 list-disc mb-4">
                    {
                      opening.desireables.map((desirable, index) => (
                        <li
                          className="text-sm"
                          key={`${opening.name}-desirables-${index}`}>
                          {desirable}
                        </li>
                      ))
                    }
                  </ul>
                  <div className="flex justify-end">
                    <button className="px-4 py-2 rounded-md bg-primary text-white dark:bg-inverted">
                      Apply Now
                    </button>
                  </div>
                </div>
              </Accordion>
            ))
          }
        </div>
        <SubTitle>Application</SubTitle>
        <div className="w-full mt-5">
          <ApplicationForm />
        </div>
      </div>
    </AppLayout>
  )
}
