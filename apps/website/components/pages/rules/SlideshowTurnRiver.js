import CardSlideshow from "../../misc/CardSlideshow";

import {
  AceClubs,
  DiamondSuitBack,
  FiveDiamonds,
  FourSpades,
  KingDiamonds,
  ThreeSpades,
} from "@chamomileclub/casinojs";

const slides = [
  {
    Cards: [DiamondSuitBack, KingDiamonds, FourSpades, AceClubs, ThreeSpades],
    title: "Card Reveal 4 - The Turn",
    description:
      "The fourth card revealed does not help any of the players left in the round. They can play mind games with eachother raising to see if someone folds or they may just call. Seagal is kicking themselves at this point as at least they would have had a pair. Of course Steven and Bobby could just be bluffing...",
  },
  {
    Cards: [FiveDiamonds, KingDiamonds, FourSpades, AceClubs, ThreeSpades],
    title: "Card Reveal 5 - The River",
    description:
      "The fifth and final card is revealed and it is a lucky break for Bobby, they found their Straight after all. Steven is still bringing their Three of a Kind to the table.",
  },
];

const SlideshowTurnRiver = () => <CardSlideshow slideshowTitle="turn-river" slides={slides} />;

export default SlideshowTurnRiver;
