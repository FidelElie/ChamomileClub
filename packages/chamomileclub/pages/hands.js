// ! Assets
import hands from "../assets/data/hands";

// ! Library
import { useTheme } from "../lib/providers/theme";

// ! Components
import AppLayout from "../components/core/App";
import {
  PageHeader,
  SubTitle,
  Paragraph
} from "../components/core/Prose";

export default function Hands() {
  const theme = useTheme()[0];

  return (
    <AppLayout title="The Chamomile Club | The Hands">
      <div>
        <PageHeader
          title="The Hands"
          tagline="Normal Texas Hold'em Hands, All In One Place"
        />
        <div className="my-6">
          <a
            className="block w-min whitespace-nowrap px-5 py-4 rounded-md text-white bg-green-900 text-xl shadow-lg font-semibold tracking-tighter dark:bg-invertedDark"
            href={`/docs/the-hands${theme === "dark" ? "-dark" : ""}.pdf`}
            download="The Hands.pdf"
          >
            Download The Hands
          </a>
        </div>
      </div>
      {
        hands.map(hand => (
          <div className="mb-5" key={hand.name}>
            <SubTitle>{ hand.name }</SubTitle>
            <Paragraph>{ hand.description }</Paragraph>
            <div className="flex items-center space-x-3 my-3">
              {
                hand.cards.map((Card, index) => (
                  <Card
                    className="w-1/5 h-auto md:w-1/12 shadow-lg"
                    key={`${hand.name}-${index}`}
                  />
                ))
              }
            </div>
            <Paragraph><span className="italic text-base">{hand.cardDescription}</span></Paragraph>
          </div>
        ))
      }
    </AppLayout>
  )
}
