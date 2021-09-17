import Link from "next/link";

// ! Data
import team from "../assets/data/team";

// ! Components
import AppLayout from "../components/core/App";
import { PageHeader, PageTagline } from "../components/core/Prose";
import ImageCard from "../components/misc/ImageCard";

export default function Team() {
  return (
    <AppLayout title="The Chamomile Club | The Team">
      <PageHeader
        title="The Team"
        tagline="We are here to provide a quality night of poker, food and fun. These are some of people who help us achieve this. They may help with the inner workings of the club - but don't be mistaken - they will take your chips too."
      />
      <div className="w-full flex flex-col space-y-5 mb-10">
        { team.map(member => <ImageCard {...member} key={member.name}/>) }
      </div>
      <PageTagline>
        <span>Want to be a part of the team? Check our job openings </span>
        <Link href="/jobs">
          <a className="underline">here</a>
        </Link>.
      </PageTagline>
    </AppLayout>
  )
}
