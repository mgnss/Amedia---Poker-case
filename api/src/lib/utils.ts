const cardSuits = ["h", "r", "k", "s"];
const cardRanks = [
    "a",
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
];

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

export const analyseHand = (hand: string[]): string => {
    const suits: string[] = [];
    const ranks: string[] = [];

    hand.forEach((card) => {
        ranks.push(card[0]);
        suits.push(card[1]);
    });

    ranks.sort((a, b) => cardRanks.indexOf(a) - cardRanks.indexOf(b));

    const isFourOfAKind = ranks.some(
        (rank) => ranks.filter((r) => r === rank).length === 4
    );
    const isFullHouse = ranks.some(
        (rank) => ranks.filter((r) => r === rank).length === 3
    );
    const isFlush = suits.every((suit) => suit === suits[0]);
    const isStraight = ranks.every(
        (rank, i) =>
            ranks[i + 1] &&
            ranks[i + 1].charCodeAt(0) - rank.charCodeAt(0) === 1
    );
    const isThreeOfAKind = ranks.some(
        (rank) => ranks.filter((r) => r === rank).length === 3
    );
    const isTwoPair =
        ranks.filter((rank) => ranks.filter((r) => r === rank).length === 2)
            .length === 4;
    const isOnePair =
        ranks.filter((rank) => ranks.filter((r) => r === rank).length === 2)
            .length === 2;

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
