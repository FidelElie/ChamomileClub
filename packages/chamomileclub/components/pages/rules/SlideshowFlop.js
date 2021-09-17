import CardSlideshow from "../../misc/CardSlideShow";

import {
	ThreeSpades,
	AceClubs,
	FourSpades,
	DiamondSuitBack
} from "@chamomileclub/casinojs";

const slides = [
	{
		Cards: [DiamondSuitBack, DiamondSuitBack, DiamondSuitBack, DiamondSuitBack, ThreeSpades],
		title: "Community Card Reveal 1",
		description: "With the first card revealed, Bobby is happy to see that they may have a Straight - 5 cards in sequence."
	},
	{
		Cards: [DiamondSuitBack, DiamondSuitBack, DiamondSuitBack, AceClubs, ThreeSpades],
		title: "Community Card Reveal 2",
		description: "With the second card revealed, Steven is over the moon and would proabably raise becuase they have the highest - Three of a Kind - you can have. Seagal still has nothing..."
	},
	{
		Cards: [DiamondSuitBack, DiamondSuitBack, FourSpades, AceClubs, ThreeSpades],
		title: "Community Card Reveal 3",
		description: "With the third card revealed, Bobby is on the way to a Straight so decides to stay in. Player 3 even with their high cards decides to fold."
	}
]

const SlideshowFlop = () => (
	<CardSlideshow
		slideshowTitle="flop"
		slides={slides}
	/>
)

export default SlideshowFlop;
