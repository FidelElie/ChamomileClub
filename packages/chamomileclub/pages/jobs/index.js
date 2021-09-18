// ! Data
import openings from "../../assets/data/openings";

// ! Components
import AppLayout from "../../components/core/App";
import { PageHeader, Paragraph, SubSubTitle, SubTitle, List } from "../../components/core/Prose";
import JobDisplay from "../../components/pages/jobs/DisplayJob";

export default function Jobs() {
  return (
    <AppLayout title="The Chamomile Club | Job Openings">
      <div className="w-full container max-w-4xl mx-auto px-8 pt-28 pb-10">
        <PageHeader
          title="Jobs"
          tagline="Are you interested in joining the movement? See our open positions below."
        />
        <SubTitle>Positions</SubTitle>
        <div className="mt-5 mb-10 flex flex-wrap w-full space-y-4 md:space-y-0">
          { openings.map(opening => <JobDisplay opening={opening} key={opening._id}/>) }
        </div>
        <SubTitle>Information</SubTitle>
        <div className="mb-5">
          <SubSubTitle>Recruitment Process</SubSubTitle>
          <Paragraph>We want the very best to join our team. So all of our positions possess a three stage interview process:</Paragraph>
          <List
            id="interview-process"
            items={[
              "Starting with an inital call with one of the Founders.",
              "A technical interview to test your skills for the position.",
              "A final video call with all of the Founder, to See if you're a good fit within the club."
            ]}
            ordered
          />
        </div>
        <div className="mb-5">
          <SubSubTitle>Compensation</SubSubTitle>
          <Paragraph>Salary to be negotiated on recieving an offer but, expect to be properly compensated for your efforts. We are a family at <span className="font-heading text-2xl">The Chamomile Club</span>.</Paragraph>
        </div>
        <SubSubTitle>Benefits</SubSubTitle>
        <Paragraph>We treat our team as well as our guests. Coming to work for us comes with many benefits:</Paragraph>
        <List
          id="benefits"
          items={[
            "Food Provided.",
            "Flexible Hours.",
            "Friendly Work Environemnt.",
            "Potential To Buy In*"
          ]}
        />
        <span className="block mb-2 mt-5 italic text-white font-extralight">
          * Potential of buy-in for staff is contigent on guest list and subject to change.
        </span>
      </div>
    </AppLayout>
  )
}
