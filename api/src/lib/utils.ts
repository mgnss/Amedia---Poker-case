import { HandT } from "./types";

const cardSuits = ["h", "r", "k", "s"];
const cardRanks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "t",
    "j",
    "d",
    "k",
    "a",
];

//Creates a random hand of 5 cards
export const createRandomHand = (): string[] => {
    const deck = cardSuits.reduce((acc, suit) => {
        cardRanks.forEach((rank) => {
            acc.push(`${rank}${suit}`);
        });
        return acc;
    }, [] as string[]);

    const hand = [];

    for (let i = 0; i < 5; i++) {
        const rndGen = Math.floor(Math.random() * deck.length);
        hand.push(deck.splice(rndGen, 1)[0]);
    }

    return hand;
};

//Converts the face cards to numbers for "straight" comparison
const convertFaces = (ranks: string[]): string[] => {
    return ranks.map((rank) => {
        switch (rank) {
            case "t":
                return "10";
            case "j":
                return "11";
            case "d":
                return "12";
            case "k":
                return "13";
            case "a":
                return "14";
            default:
                return rank;
        }
    });
};

//Analyse the hand and return the category
export const analyseHand = (hand: string[]): string => {
    const suits: string[] = [];
    let ranks: string[] = [];

    //Split cards into ranks and suits
    hand.forEach((card) => {
        ranks.push(card[0]);
        suits.push(card[1]);
    });

    ranks = convertFaces(ranks);
    ranks.sort((a, b) => parseInt(a) - parseInt(b));

    const rankCounts = [...new Set(ranks)].map(
        (currentRank) => ranks.filter((rank) => rank === currentRank).length
    );

    const isFourOfAKind = rankCounts.includes(4);

    const isFullHouse = rankCounts.includes(3) && rankCounts.includes(2);

    const isFlush = suits.every((suit) => suit === suits[0]);

    const isStraight = ranks.every((currentRank, i) => {
        return (
            i === ranks.length - 1 ||
            parseInt(ranks[i + 1]) - parseInt(currentRank) === 1
        );
    });

    const isThreeOfAKind = rankCounts.includes(3);

    const isTwoPair = rankCounts.filter((count) => count === 2).length === 2;

    const isOnePair = rankCounts.filter((count) => count === 2).length === 1;

    if (isFlush && isStraight) {
        return "Straight flush";
    }
    if (isFourOfAKind) {
        return "Four of a kind";
    }
    if (isFullHouse) {
        return "Full house";
    }
    if (isFlush) {
        return "Flush";
    }
    if (isStraight) {
        return "Straight";
    }
    if (isThreeOfAKind) {
        return "Three of a kind";
    }
    if (isTwoPair) {
        return "Two pair";
    }
    if (isOnePair) {
        return "One pair";
    }

    return "High Card";
};

export const findWinnerByHands = (hands: HandT[]): HandT[] => {
    const categories = [
        "High Card",
        "One pair",
        "Two pair",
        "Three of a kind",
        "Straight",
        "Flush",
        "Full house",
        "Four of a kind",
        "Straight flush",
    ];

    const ratedHands = hands.map((hand, i) => {
        return {
            index: i,
            categoryRank: categories.indexOf(hand.category),
        };
    });

    //From lowest to highest category rank
    ratedHands.sort((a, b) => a.categoryRank - b.categoryRank);

    //Return the hand with the highest category or if its a tie, return all the tied hands
    return hands
        .map((_, i) => {
            if (
                ratedHands[ratedHands.length - 1].categoryRank ===
                ratedHands[i].categoryRank
            ) {
                return hands[ratedHands[i].index];
            }
        })
        .filter((hand) => hand !== undefined);
};
