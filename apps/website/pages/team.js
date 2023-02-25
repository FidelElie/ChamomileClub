// ! Data
import team from "../assets/data/team";

// ! Components
import AppLayout from "../components/core/App";
import { PageHeader} from "../components/core/Prose";
import ImageCard from "../components/misc/ImageCard";

export default function Team() {
  return (
    <AppLayout title="The Chamomile Club | The Team">
      <div className="w-full container max-w-4xl mx-auto px-8 pt-28 pb-10">
        <PageHeader
          title="The Team"
          tagline="We are here to provide a quality night of poker, food and fun. These are some of people who help us achieve this. They may help with the inner workings of the club - but don't be mistaken - they will take your chips too."
        />
        <div className="w-full flex flex-col space-y-5 mb-10">
          { team.map(member => <ImageCard {...member} key={member.name}/>) }
        </div>
      </div>
    </AppLayout>
  )
}
