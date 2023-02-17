// ! Next and React
import Link from "next/link";
import { useRef } from "react";

// ! Library
import {
  WhiteChip,
  GreenChip,
  BlueChip,
  RedChip,
  BlackChip,
} from "@chamomileclub/casinojs";
import { useTheme } from "../lib/providers/theme";

// ! Components
import AppLayout from "../components/core/App";
import {
  PageHeader,
  SubTitle,
  Paragraph,
  SubSubTitle,
  List
} from "../components/core/Prose";
import SlideshowPreFlop from "../components/pages/rules/SlideshowPreFlop";
import SlideshowFlop from "../components/pages/rules/SlideshowFlop";
import SlideshowTurnRiver from "../components/pages/rules/SlideshowTurnRiver";
import SlideshowResults from "../components/pages/rules/SlideshowResults";
import BlindCalculator from "../components/pages/rules/BlindCalculator";

const recommendedBase = [
  { chip: WhiteChip, value: 5  },
  { chip: GreenChip, value: 10 },
  { chip: BlueChip, value: 25 },
  { chip: RedChip, value: 50 },
  { chip: BlackChip, value: 100 }
]

export default function Rules() {
  const introReference = useRef();
  const potsReference = useRef();
  const additionsReference = useRef();
  const glossaryReference = useRef();

  const references = [
    { ref: introReference, text: "Introduction" },
    { ref: potsReference, text: "Pots, Community and Winning" },
    { ref: additionsReference, text: "House Additions" },
    { ref: glossaryReference, text: "Glossary" }
  ]

  const theme = useTheme()[0]

  const scrollToReference = (reference) => {
    if (reference) {
      reference.current.scrollIntoView({
        behavior: "smooth"
      })
    }
  }

  return (
    <AppLayout title="The Chamomile Club | The Rules">
      <div className="w-full container max-w-4xl mx-auto px-8 pt-28 pb-10">

        <PageHeader
          title="The Rules"
          tagline="Containing the rules of old, with a few new tricks. Have more fun pushing the pot."
        />
        <div className="flex flex-col space-y-2 md:space-y-0 md:items-center md:space-x-5 md:flex-row md:flex-wrap">
          {
            references.map((reference, index) => (
              <span
                className="text-white font-light text-xl cursor-pointer underline"
                onClick={() => scrollToReference(reference.ref)}
                key={`contents-${index}`}
              >
                { reference.text }
              </span>
            ))
          }
        </div>
        <hr className="w-full my-5"/>
        <div ref={introReference}>
          <SubTitle>Introduction</SubTitle>
          <Paragraph>
            This page is for a poker player of any experience level to start with our <span className="text-2xl font-heading">Chamomile Club</span> poker nights. If you are familiar with how to play Texas Hold'em from the beginning than feel free to skip to the House Additions section <ScrollLink onClick={() => scrollToReference(additionsReference)}>below</ScrollLink>. For those of you who are new, want clarification or to shake off the rust. Let's get started.
          </Paragraph>
        </div>
        <div ref={potsReference}>
          <SubTitle>Pots, Community and Winning</SubTitle>
          <SubSubTitle>Buy Ins</SubSubTitle>
          <Paragraph>A maximum number of ten players can be around the poker table and depending on if you would like to request to play for money or not two scenarios take place:</Paragraph>
          <div className="flex flex-col my-5 space-y-5">
            <List
              id="buy-in-1"
              items={["A free buy in (not playing for money) can occur where an equal number of chips are allocated to each player with an agreed upon value for each. Our recommended values are displayed below for each of the chips we provide."]}
            />
            <div className="flex items-center justify-center space-x-5">
              {
                recommendedBase.map(base => (
                  <div
                    className="flex flex-col items-center w-1/5 box-border"
                    key={`recommended-chip-${base.value}`}
                  >
                    <base.chip className="w-full mb-3 h-auto shadow rounded-full"/>
                    <span className="text-white font-semibold font-heading tracking-widest">{ base.value }</span>
                  </div>
                ))
              }
            </div>
            <List
              id="buy-in-2"
              items={["A buy in is agreed upon by players and held by the house, upon finishing the game, money is allocated to each player based on the proportion of chips they started with and now possess."]}
            />
          </div>
          <InformationBanner>
            <span className="uppercase font-medium">Note:</span> For all of the high-rollers out there. It is required that all players agree to a buy in for this scenario to take place on the night. Otherwise you are playing for free.
          </InformationBanner>
          <SubSubTitle>Stage One - The Pre-Flop</SubSubTitle>
          <Paragraph>
            After the chips are given out, it is time to play cards. The pot is where all the chips for that round go when bet by players. At the start of each round a player will have to put in a big blind, this is a compulsory amount of money that has to be at the start of each and every round. The player to their left is also required to place in their small blind - half of the big blind's value.
          </Paragraph>
          <Paragraph>
            We then go clockwise round the table and ask each person for their choice, Call Raise or Fold. This is three out of the four actions a player can do (other than the secret 5th - flipping the table). Let's see what they mean:
          </Paragraph>
          <div className="flex flex-col my-5">
            <List
              id="pre-flop-options"
              items={[
                "If a player Calls, they match whatever the highest bet on the table is at that point. Allowing them to stay in that round.",
                "If a player Raises, they bet more money above what the highest currently is on the table. Everyone on the table now has to call or raise.",
                "If a player Folds, you discard your cards and you are out of that round. Better hope it was worth it, there is a chance you may have won if you stayed in."
              ]}
            />
          </div>
          <InformationBanner>
              <span className="uppercase font-medium">Tip:</span> You haven't seen the cards in the community during the Pre Flop stage so its really hard to know if you have the winning hand at this point. Consider waiting for The Flop and not folding at this point - especially if you played the blind.
          </InformationBanner>
          <Paragraph>
            Once everyone has called the highest bet or folded, the next part begins. Let's look at an example: Steven, Bobby And Seagal are playing a round...
          </Paragraph>
          <div className="my-2">
            <SlideshowPreFlop/>
          </div>
          <InformationBanner>
            <span className="uppercase font-medium">Note:</span> Knowing the hands is a great step towards winning rounds and chips. Check out each of the hands <Link href="/hands"><a className="underline">here</a></Link>.
          </InformationBanner>
          <SubSubTitle topMargin>Stage Two  - The Flop</SubSubTitle>
          <Paragraph>
            The dealer will now start placing community cards - those of which are shared between players located in the middle of the table. In this round they place three cards called <span className="italic">"The Flop"</span>. Starting from the last person who raised on the table and still moving clockwise. This player has three possible actions they can do. They can Raise the bet, Fold or introducing the last action - Check.
          </Paragraph>
          <div className="flex flex-col my-5">
            <List
              id="flop-list"
              items={[
                "If a player Checks, they are content with the state of the game and do not want to raise or fold. As they have already matched the current highest bet around the table."
              ]}
            />
          </div>
          <Paragraph>
            We then go around the table, if that player raised everyone has to <span className="italic">Call</span>, <span className="italic">Raise</span> or <span className="italic">Fold</span>. If that player <span className="italic">Checks</span> then all other players are welome to follow suit. When everyone has called or checked this is the end of the round.
          </Paragraph>
          <div className="my-3">
            <SlideshowFlop/>
          </div>
          <SubSubTitle topMargin>
          The Final Stages -<br className="md:hidden"/> The Turn and The River
          </SubSubTitle>
          <Paragraph>
              Two more stages follow the second. The dealer places another card in the community for each. <span className="italic">"The Turn"</span> in the third stage and the <span className="italic">"The River"</span> in the fourth. Each of these rounds follow the same structure as the second. In the final when all betting has been done it is time for players to reveal their cards.
          </Paragraph>
          <InformationBanner>
            <span className="uppercase font-medium">Tip:</span> Know when to hold them and when to fold them. Staying in to The Turn and The River stages may have you putting in a lot of chips to stay in the round. Make sure you know its worth it. Its not the end of the world to fold and live to fight another round.
          </InformationBanner>
          <div className="my-8">
            <SlideshowTurnRiver/>
          </div>
          <SubSubTitle topMargin>
            Who Dares Wins
          </SubSubTitle>
          <Paragraph>
            Your goal is to make the strongest five card hand possible with the cards in the community and those in your hand.  Whoever has the strongest hand wins all the money in the pot. As simple as that, then the deck is reshuffled, the winner takes their chips and another round begins.
          </Paragraph>
          <div className="my-8">
            <SlideshowResults/>
          </div>
        </div>
        <div ref={additionsReference}>
          <SubTitle>House Additions</SubTitle>
          <div className="my-6">
            <a
              className="block w-min whitespace-nowrap px-5 py-4 rounded-md text-white bg-green-900 text-xl shadow-lg font-semibold tracking-tighter dark:bg-invertedDark"
              href={`/docs/the-rules${theme === "dark" ? "-dark" : ""}.pdf`}
              download="The Rules.pdf"
            >
              Download The House Rules
            </a>
          </div>
          <Paragraph>
            Now that you know the basic rules and are clear on some exceptions. We can get to the good stuff and teach you the Founder's house rules.
          </Paragraph>
          <List
            id="house-additions-1"
            items={[
              "Showdowns (1 on 1) are no different from normal play in the house, ties are rarer and someone will win big.",
              "The value of the big blind is determined by the player who possesses the small blind (right of the big blind player). They roll a dice and the value it lands on is what the base big blind is multipled by. The small blind is always half of the big's value like normal.",
            ]}
          />
          <div className="mt-5">
            <BlindCalculator/>
          </div>
          <InformationBanner>
            <span className="uppercase font-medium">Note:</span> Don't worry about this rule if it's your first time. We will introduce it when you're ready.
          </InformationBanner>
          <List
            id="house-additions-2"
            items={[
              "As mentioned above, all players at a night have to agree on a buy in before playing for money. Club rules.",
              "No players are permitted to leave the table until a round is complete, unless for good reason. Between rounds however, it is fair game, go get a drink, chat with the players, have a merry old time.",
              "A tea break can be requested by a player every 10 rounds and will be provided by the staff. Longer breaks between rounds will happen at the same interval."
            ]}
          />
        </div>
        <div ref={glossaryReference}>
          <SubTitle>Glossary</SubTitle>
          <Paragraph>All the terminologies used in one place.</Paragraph>
          <List
            id="glossary"
            items={[
              "The Pot: Where all the money that is bet for a round goes.",
              "Blinds: A mandatory bet that starts off betting in a round. One player is required to put in a big blind and the player to their right of them the small.",
              "Community Cards: Five cards that are placed in three stages. Three in the Flop, 1 in The Turn and the last in The River.",
              "Kicker: Cards that are not used to make your best 5 card hand.",
              "Calling: A player matches the current highest bet on the table.",
              "Raising: A player increases the maximum bet of the table.",
              "Folding: A player bows out of the round. Discarding their cards.",
              "Checking: The first player at the start of a stage calls the highest bet of which they were already currently on. (No action).",
              "Buy In: The amount of money being put in by each player when playing for money."
            ]}
          />
        </div>
      </div>
    </AppLayout>
  )
}

const ScrollLink = (props) => {
  const { onClick, children } = props;

  return (
    <span className="underline text-white cursor-pointer" onClick={onClick}>
      { children }
    </span>
  )
}

const InformationBanner = (props) => {
  const { children } = props;

  return (
    <div className="p-5 text-center text-white my-5 bg-green-800 dark:bg-invertedLight">
      <Paragraph>{ children }</Paragraph>
    </div>
  )
}
