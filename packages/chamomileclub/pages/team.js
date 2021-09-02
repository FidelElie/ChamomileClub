import Link from "next/link";

// ! Data
import team from "../assets/data/team";

// ! Components
import { PageHeader, PageTagline } from "../components/core/Prose";
import ImageCard from "../components/misc/ImageCard";

export default function Team() {
  return (
    <main>
      <div className="w-full container max-w-4xl mx-auto px-8 pt-28 pb-10 md:px-0">
        <PageHeader
          title="The Team"
          tagline="We are heve to provide quality poker and these are some of people who help us achieve this. They may help with the inner workings but don't be mistaken they will take your chips too."
        />
        <div className="w-full flex flex-col space-y-5 mb-10">
          {
            team.map(member => <ImageCard {...member} key={member.name}/>)
          }
        </div>
        <PageTagline>
          <span>Want to Be A Part Of The Team? Check Openings </span>
          <Link href="/jobs">
            <a className="underline">Here</a>
          </Link>.
        </PageTagline>
      </div>
    </main>
  )
}
