const cardsRank = {
    A: 13,
    K: 12,
    Q: 11,
    J: 10,
    T: 9,
    9: 8,
    8: 7,
    7: 6,
    6: 5,
    5: 4,
    4: 3,
    3: 2,
    2: 1
}

const cardsRankPartII = {
    A: 13,
    K: 12,
    Q: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    J: 1
}

function getType(hand, withJoker = false) {
    let set = [...new Set(hand.split(''))];
    let sortedNbCards = set.map((s) => hand.split('').filter((f) => f === s)).sort((a, b) => b.length-a.length === 0 ? (withJoker ? cardsRankPartII[b] - cardsRankPartII[a] : cardsRank[b] - cardsRank[a]) : b.length-a.length);

    if (withJoker) {
        let temphand = hand.replaceAll('J', sortedNbCards[0][0] !== 'J' ? sortedNbCards[0][0] : (sortedNbCards.length !== 1 ? sortedNbCards[1][0] : sortedNbCards[0][0]))
        set = [...new Set(temphand.split(''))];
        sortedNbCards = set.map((s) => temphand.split('').filter((f) => f === s)).sort((a, b) => b.length-a.length === 0 ? (withJoker ? cardsRankPartII[b] - cardsRankPartII[a] : cardsRank[b] - cardsRank[a]) : b.length-a.length)
        console.log(sortedNbCards)
    }

    if (set.length === 1) {
        return 7; // Five of a kind => 7
    } else if (set.length === 2) {
        // Four of a kind => 6
        // OR
        // Full house => 5
        return sortedNbCards[0].length === 4 ? 6 : 5;
    } else if (set.length === hand.length) {
        return 1; // High card => 1
    }
    else {
        // Three of kind => 4
        // OR
        // Two pair => 3
        // OR
        // One pair => 2
        return sortedNbCards[0].length >= 2 && set.length === 3 ? (sortedNbCards[0].length !== sortedNbCards[1].length ? 4 : 3) : 2;
    }
}

function solvePartOne(data, withJoker = false) {
    let hands = data.map((h) => {
        let cards = h.split(' ')[0]; 
        return {
            cards: cards,
            bid: parseInt(h.split(' ')[1]),
            type: getType(cards, withJoker)
        }
    });
    
    hands = hands.sort((a, b) => {
        let aHand = a.cards;
        let bHand = b.cards;

        let aType = a.type;
        let bType = b.type;

        if (aType !== bType) {
            return aType - bType;
        }

        let aCards = aHand.split('');
        let bCards = bHand.split('');

        let difference = 0;

        while (difference === 0 && aCards.length !== 0) {
            let aCard = aCards.shift();
            let bCard = bCards.shift();

            difference = withJoker === true ? (cardsRankPartII[aCard] - cardsRankPartII[bCard]) : (cardsRank[aCard] - cardsRank[bCard]);
        }

        return difference;
    })
    return hands.map((h, i) => h.bid*(i+1))
    .reduce((a, b) => a+b, 0);
}

function solvePartTwo(data) {
    return solvePartOne(data, true);
}

export const solve = (data) => {
    return [solvePartOne(data), solvePartTwo(data)];
}