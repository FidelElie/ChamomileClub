import CardSlideshow from "../../misc/CardSlideshow";

import {
	AceSpades,
	AceHearts,
	AceClubs,
	TwoHearts,
	ThreeClubs,
	FourSpades,
	ThreeSpades,
	FiveDiamonds,
	KingDiamonds,
	KingHearts,
	TenSpades
} from "@chamomileclub/casinojs";

const slides = [
	{
		Cards: [FiveDiamonds, KingDiamonds, FourSpades, AceClubs, ThreeSpades],
		title: "The Community Cards",
		description: "Let's have a closer look at the hands that each of the remaining players can make."
	},
	{
		Cards: [AceSpades, AceHearts],
		title: "Steven: Hand",
		description: "As a quick reminder, these are the two cards Steven had in their hand."
	},
	{
		Cards: [TwoHearts, ThreeClubs],
		title: "Bobby: Hand",
		description: "As well as Bobby's hand, let's see who wins."
	},
	{
		Cards: [FiveDiamonds, KingDiamonds, AceSpades, AceClubs, AceHearts],
		title: "Steven: Strongest Hand",
		description: "Steven has a Three of a Kind (three of the same card) with a Five of Diamonds and King of Diamonds as the highest cards to keep in hand. The Four of Spades and Three of Spades are both kicked.",
	},
	{
		Cards: [FiveDiamonds, FourSpades, ThreeClubs, TwoHearts, AceClubs],
		title: "Bobby: Strongest Hand",
		description: "Rearranging the community we see that Bobby definitely got the - Straight. Some hands beat others and a Straight is a better hand than a Three of a Kind - so Bobby wins and takes the pot."
	},
	{
		Cards: [FiveDiamonds, KingDiamonds, KingHearts, TenSpades, AceClubs],
		title: "Seagal: Strongest Hand",
		description: "For completeness, let's also see Seagal's strongest hand. They ended up with a pair of Kings. So it was right of them to fold when they did. They were not winning this round."
	}
]

const SlideshowResults = () => (
	<CardSlideshow
		slideshowTitle="results"
		slides={slides}
	/>
)

export default SlideshowResults;
