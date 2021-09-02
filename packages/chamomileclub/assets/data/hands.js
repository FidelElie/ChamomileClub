import {
  AceHearts,
  SixDiamonds,
  FourClubs,
  TwoHearts,
  AceClubs,
  NineSpades,
  EightDiamonds,
  SevenClubs,
  KingDiamonds,
  EightHearts,
  EightSpades,
  KingClubs,
  QueenHearts,
  QueenSpades,
  JackDiamonds,
  AceSpades,
  TwoDiamonds,
  FiveHearts,
  SixClubs,
  SevenDiamonds,
  NineHearts,
  FourHearts,
  SixHearts,
  KingHearts,
  AceDiamonds,
  KingSpades,
  FiveSpades,
  SixSpades,
  SevenSpades,
  TenHearts,
  JackHearts,
} from "@chamomileclub/casinojs";

const hands = [
  {
    name: "High Card",
    description: "The lowest way to win, you have none of the other combinations, so the highest card wins (Ace is the highest card).",
    cards: [AceHearts, EightSpades, SixDiamonds, FourClubs, TwoHearts]
  },
  {
    name: "Pair",
    description: "Very common, two cards of the same kind, for example you have one ace card and another in the community so you have a pair.",
    cards: [AceClubs, AceHearts, NineSpades, EightDiamonds, SevenClubs]
  },
  {
    name: "Two Pair",
    description: "You have two Pairs pretty self explanatory.",
    cards: [KingDiamonds, KingClubs, QueenHearts, QueenSpades, JackDiamonds]
  },
  {
    name: "Three Of A Kind",
    description: "Now we're talking, you have three cards of the same type.",
    cards: [AceClubs, AceHearts, AceSpades, TwoDiamonds, SevenClubs]
  },
  {
    name: "Straight",
    description: "A series of five cards that follow eachother, they do not need to be of the same suit.",
    cards: [FiveHearts, SixClubs, SevenDiamonds, EightSpades, NineHearts]
  },
  {
    name: "Flush",
    description: "Five cards that are all of the same suit. These do not need to be in any order.",
    cards: [TwoHearts, FourHearts, SixHearts, EightHearts, KingHearts]
  },
  {
    name: "Full House",
    description: "A combination of a three of a kind and a Pair. The highest three of a kind wins if miltiple full houses happen.",
    cards: [AceSpades, AceDiamonds, AceClubs, KingHearts, KingSpades]
  },
  {
    name: "Four of a kind",
    description: "Low odds but high reward, you have four of the same cards. For example four aces!",
    cards: [AceHearts, AceClubs, AceDiamonds, AceSpades, TwoHearts]
  },
  {
    name: "Straight Flush",
    description: "The second best hand, a combination of a flush and a straight, get this and watch out for lightening bolts.",
    cards: [FiveSpades, SixSpades, SevenSpades, EightSpades, NineSpades]
  },
  {
    name: "Royal Flush",
    description: "Go play the lottery, a straight flush from 10 to Ace, nothing beats this hand.",
    cards: [TenHearts, JackHearts, QueenHearts, KingHearts, AceHearts]
  }
]

export default hands;
