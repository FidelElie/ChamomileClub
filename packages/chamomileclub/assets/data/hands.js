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
    cards: [AceHearts, EightSpades, SixDiamonds, FourClubs, TwoHearts],
    cardDescription: "The highest card is the Ace Of Hearts"
  },
  {
    name: "Pair",
    description: "Very common, two cards of the same kind, for example you have one Ace in your hand and there's another on the table so you have a pair.",
    cards: [AceClubs, AceHearts, NineSpades, EightDiamonds, SevenClubs],
    cardDescription: "A pair of Aces, Clubs and Hearts"
  },
  {
    name: "Two Pair",
    description: "You have two Pairs, pretty self explanatory.",
    cards: [KingDiamonds, KingClubs, QueenHearts, QueenSpades, JackDiamonds],
    cardDescription: "Two pairs, Kings and Queens"
  },
  {
    name: "Three of a Kind",
    description: "Now we're talking, you have three cards of the same kind.",
    cards: [AceClubs, AceHearts, AceSpades, TwoDiamonds, SevenClubs],
    cardDescription: "Three Aces, Spades, Clubs and Hearts"
  },
  {
    name: "Straight",
    description: "A series of five cards that follow eachother, they do not need to be of the same suit.",
    cards: [FiveHearts, SixClubs, SevenDiamonds, EightSpades, NineHearts],
    cardDescription: "A Straight from Five To Nine."
  },
  {
    name: "Flush",
    description: "Five cards that are all of the same suit. These do not need to be in any particular order.",
    cards: [TwoHearts, FourHearts, SixHearts, EightHearts, KingHearts],
    cardDescription: "A Flush Of Hearts."
  },
  {
    name: "Full House",
    description: "A combination of a Three of a Kind and a Pair.",
    cards: [AceSpades, AceDiamonds, AceClubs, KingHearts, KingSpades],
    cardDescription: "A Full House: Three Aces and A Pair Of Kings."
  },
  {
    name: "Four of a Kind",
    description: "Low odds but high reward, you have four of the same kind. For example, four Aces!",
    cards: [AceHearts, AceClubs, AceDiamonds, AceSpades, TwoHearts],
    cardDescription: "A Four of a Kind, all suits of Ace."
  },
  {
    name: "Straight Flush",
    description: "The second best hand, a combination of a flush and a straight, get this and watch out for lightening bolts.",
    cards: [FiveSpades, SixSpades, SevenSpades, EightSpades, NineSpades],
    cardDescription: "A Straight Flush of Spades from Five to Nine."
  },
  {
    name: "Royal Flush",
    description: "Go play the lottery, a straight flush from 10 to Ace, nothing beats this hand.",
    cards: [TenHearts, JackHearts, QueenHearts, KingHearts, AceHearts],
    cardDescription: "A Royal Flush in all its glory."
  }
]

export default hands;
