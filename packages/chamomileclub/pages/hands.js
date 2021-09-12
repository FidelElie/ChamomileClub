// ! Assets
import hands from "../assets/data/hands";

// ! Library
import { useTheme } from "../lib/providers/theme";

// ! Components
import {
  PageHeading,
  PageTagline,
  SubTitle,
  Paragraph
} from "../components/core/Prose";

export default function Hands() {
  const theme = useTheme()[0];

  return (
    <main>
      <div className="w-full container max-w-4xl mx-auto px-8 pt-28 pb-10 md:px-0">
        <div>
          <PageHeading>The Hands</PageHeading>
          <PageTagline>Like Normal Texas Hold'em, All In One Place</PageTagline>
          <div className="my-6">
            <a
              className="block w-min whitespace-nowrap px-5 py-4 rounded-md text-white bg-green-900 text-xl shadow-lg font-semibold tracking-tighter dark:bg-invertedDark"
              href={`/docs/the-hands${theme === "dark" ? "-dark" : ""}.pdf`}
              download="The Hands.pdf"
            >
              Print The PDF
            </a>
          </div>
        </div>
        {
          hands.map(hand => (
            <div className="mb-5" key={hand.name}>
              <SubTitle>{ hand.name }</SubTitle>
              <Paragraph>{ hand.description }</Paragraph>
              <div className="flex items-center space-x-3 mt-3">
                {
                  hand.cards.map((Card, index) => (
                    <Card
                      className="w-1/5 h-auto md:w-1/12 shadow-lg"
                      key={`${hand.name}-${index}`}
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </main>
  )
}
