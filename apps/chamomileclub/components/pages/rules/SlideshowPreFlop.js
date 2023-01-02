import CardSlideshow from "../../misc/CardSlideshow";

import {
	AceSpades,
	AceHearts,
	TwoHearts,
	ThreeClubs,
	KingHearts,
	TenSpades,
	DiamondSuitBack
} from "@chamomileclub/casinojs";

const slides = [
	{
		Cards: [AceSpades, AceHearts],
		title: "Steven - Hand",
		description: "Steven has pocket aces, with a hand like this they might consider raising the pot beyond the blind amount... Just to scare some people.",
	},
	{
		Cards: [TwoHearts, ThreeClubs],
		title: "Bobby - Hand",
		description: "Bobby has nothing particularly but there cards are in sequence. They want to wait for flop to see what the community holds."
	},
	{
		Cards: [KingHearts, TenSpades],
		title: "Seagal - Hand",
		description: "Seagal has some high cards so they like there odds and stay in the round."
	},
	{
		Cards: [DiamondSuitBack, DiamondSuitBack, DiamondSuitBack, DiamondSuitBack, DiamondSuitBack],
		title: "Community Cards",
		description: "All cards face down, time to see what the Flop reveals."
	}
]

const SlideshowPreFlop = () => (
	<CardSlideshow
		slideshowTitle="pre-flop"
		slides={slides}
	/>
)

export default SlideshowPreFlop;
