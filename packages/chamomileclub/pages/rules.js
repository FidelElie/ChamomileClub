import { useRef } from "react";

// ! Assets
import {
  WhiteChip,
  GreenChip,
  BlueChip,
  RedChip,
  BlackChip,
} from "@chamomileclub/casinojs";

// ! Components
import {
  PageHeader,
  SubTitle,
  Paragraph,
  SubSubTitle
} from "../components/core/Prose";

const recommendedBase = [
  { chip: WhiteChip, value: 5  },
  { chip: GreenChip, value: 10 },
  { chip: BlueChip, value: 25 },
  { chip: RedChip, value: 50 },
  { chip: BlackChip, value: 100 }
]

export default function Rules() {
  const additionsReference = useRef();

  const scrollToReference = (reference) => {
    if (reference) {
      reference.current.scrollIntoView({
        behavior: "smooth"
      })
    }
  }

  return (
    <main>
      <div className="w-full container max-w-4xl mx-auto px-8 pt-28 pb-10 md:px-0">
        <PageHeader
          title="The Rules"
          tagline="Containing the rules of old with a few new takes and some clarity thrown in. Have more fun pushing the pot."
        />
        <SubTitle>Introduction</SubTitle>
        <Paragraph>
          This page is for a poker player of any experience level to start with our Poker Nights. If you are familiar with how to play Texas Hold'em from the beginning than feel free to skip to the Additions section <ScrollLink onClick={() => scrollToReference(additionsReference)}>below</ScrollLink>. For those of you who are new, want clarification or to free yourselves from the rust. Let's get started.
        </Paragraph>
        <SubTitle>Pots, Community and Winning</SubTitle>
        <SubSubTitle>Buy Ins</SubSubTitle>
        <Paragraph>A maximum number of ten players can be around the poker table and depending on if you would like to request to play for money or not two scenarios take place:</Paragraph>
        <div className="flex flex-col my-5 space-y-5">
          <span className="text-white font-light">
            1. A free buy in (not playing for money) can occur where an equal number of chips are allocated to each player with an agreed upon value for each. Our recommended values are displayed below for each of the chips we provide.
          </span>
          <div className="flex items-center justify-center space-x-5">
            {
              recommendedBase.map(base => (
                <div
                  className="flex flex-col items-center w-1/5 box-border"
                  key={`recommended-chip-${base.value}`}
                >
                  <base.chip className="w-full mb-3 h-auto shadow rounded-full"/>
                  <span className="text-white font-semibold">{ base.value }</span>
                </div>
              ))
            }
          </div>
          <span className="text-white font-light">
            2. A buy in is agreed upon by players and held by the house, upon finishing the game, money is allocated to each player based on the proportion of chips they started with and now possess. Please note that it is required that all players agree to a buy in for it to happen on the night. Otherwise you are playing for free.
          </span>
        </div>
        <SubSubTitle>First Part (Pre-Flop)</SubSubTitle>
        <Paragraph>
          After the chips are given out, it is time to play cards. The pot is where all the chips that are bet for that round go. At the start of each round a player will have to put in a big blind, this is a compulsory amount of money tht has to be at the start of each and every round. The player to their left is also required to place in their small blind - half of the big blind's value.
        </Paragraph>
        <Paragraph>
          We then go clockwise round the table and ask each person for their choice, Call Raise or Fold. This is three out of the four actions a player can do (other than the secret 5th - flipping the table). Let's show what they mean:
        </Paragraph>
        <div className="flex flex-col my-5 space-y-5">
          <span className="text-white font-light">
            If a player <span className="italic">Calls</span>, they match whatever the highest bet on the table is at that point. Allowing them to stay in that round.
          </span>
          <span className="text-white font-light">
            If a player <span className="italic">Raises</span>, they bet more money above what the highest currently is on the table. Everyone on the table now has to call or raise.
          </span>
          <span className="text-white font-light">
            If a player <span className="italic">Folds</span>, you discard your cards and you are out of that round. Better hope it was worth it, there is a chance you may have won if you stayed in.
          </span>
        </div>
        <Paragraph>
          Once everyone has called the highest bet or folded, the next part begins.
        </Paragraph>
        <SubSubTitle topMargin>Second Part (The Flop)</SubSubTitle>
        <Paragraph>
          The dealer will now start placing community cards - those of which are shared between players located in the middle of the table. In this round they place three cards called <span className="italic">"The Flop"</span>. Starting from the last person who raised on the table and still moving clockwise. This player has three possible actions they can do. They can Raise the bet, Fold or introducing the last action - Check.
        </Paragraph>
        <div className="flex flex-col my-5 space-y-5">
          <span className="text-white font-light">
            If a player <span className="italic">Checks</span>, they are content with the state of the game and do not want to raise or fold. As they have already matched the current highest bet previously.
          </span>
        </div>
        <Paragraph>
          We then go around the table, if that player raised everyone has to <span className="italic">Call</span>, <span className="italic">Raise</span> or <span className="italic">Fold</span>. If that player <span className="italic">Checks</span> then all other player are welome to follow suit. When everyone has called or checked this is the end of the round.
        </Paragraph>
        <SubSubTitle topMargin>
         Final Parts<br className="md:hidden"/> (The Turn and The River)
        </SubSubTitle>
        <Paragraph>
            Two parts follow the second where the dealer places another card in the community for each. <span className="italic">"The Turn"</span> in the third round and the <span className="italic">"The River"</span> in the fourth. Each of these rounds follow the same structure as the second. In the final when all betting has been done it is time for the players to reveal their cards.
        </Paragraph>
        <Paragraph>
          Your goal is to make the strongest five card hand possible with the cards in the community and those in your hand.  Whoever has the strongest hand wins all the money in the pot. As simple as that, close hands are determined by a kicker card (ask a representative to explain this to you in a practice round). Then the deck is reshuffled and we repeat.
        </Paragraph>
        <div ref={additionsReference}>
          <SubTitle>House Additions</SubTitle>
          <Paragraph>
            Now that you know the basic rules and are clear on some exceptions. We can get to the good stuff and teach you the Founder's house rules.
          </Paragraph>
          <div className="flex flex-col my-5 space-y-5">
            <span className="text-white font-light">
              Showdowns (1 on 1) are no different from normal play in the house, ties are rarer and someone will win big.
            </span>
            <span className="text-white font-light">
              The value of the big blind is determined by the player who possess the small blind (right of the big blind player). They roll a dice and the value it lands on is what the base big blind is multipled by. The small blind is always half of the big's value like normal. The base value of the big blind will be decided in your session.
            </span>
            <span className="text-white font-light">
              As mentioned above, all parties to the game have to agree on buying in before playing for money. House rules.
            </span>
            <span className="text-white font-light">
              No players are permitted to leave the table until a round is complete. Between rounds however, it is fair game, go get a drink, chat with the players have a merry old time.
            </span>
            <span className="text-white font-light">
              A tea break can be request by a player every 10 rounds and will be provided by the staff. Longer breaks between round will happen at the same interval.
            </span>
          </div>
        </div>
      </div>
    </main>
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
