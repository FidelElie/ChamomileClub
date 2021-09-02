// ! Library
import founders from "../assets/data/founders";

// ! Components
import { PageHeader } from "../components/core/Prose";
import ImageCard from "../components/misc/ImageCard";

export default function Founders() {
  return (
    <main>
      <div className="w-full container max-w-4xl mx-auto px-8 pt-28 pb-10 md:px-0">
        <PageHeader
          title="Meet The Founders"
          tagline="They started it and now learn a bit about each of the Founders of the house. As passionate about providing great Poker Nights as playing the game itself. Don't worry if you're on the same table as them, they don't bite."
        />
        <div className="w-full flex flex-col space-y-5">
          { founders.map(founder => <ImageCard {...founder} key={founder.name}/>) }
        </div>
      </div>
    </main>
  )
}
