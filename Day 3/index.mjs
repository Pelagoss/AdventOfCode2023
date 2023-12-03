function solvePartOne(data) {
    let colsMax = data[0].length;
    let rowsMax = data.length;

    let symbols = data.map((d, i) =>  [...d.matchAll(/[^\d.]/g)].map(r => {
        let possiblePositions = []
        
        if (i > 0) {
            possiblePositions.push([i-1, r.index]);
        }

        if (i < rowsMax) {
            possiblePositions.push([i+1, r.index]);
        }

        if (r.index > 0) {
            possiblePositions.push([i, r.index-1]);
        }

        if (r.index < colsMax) {
            possiblePositions.push([i, r.index+1]);
        }

        if (r.index > 0 && i > 0) {
            possiblePositions.push([i-1, r.index-1]);
        }

        if (r.index < colsMax && i > 0) {
            possiblePositions.push([i-1, r.index+1]);
        }

        if (r.index > 0 && i < rowsMax) {
            possiblePositions.push([i+1, r.index-1]);
        }

        if (r.index < colsMax && i < colsMax) {
            possiblePositions.push([i+1, r.index+1]);
        }

        return {
            row: i,
            col: r.index,
            text: r[0],
            positions: possiblePositions
        }
    })).flat();

    let numbers = data.map((d, i) =>  [...d.matchAll(/\d+/g)].map(r => {
        return {
            row: i,
            col: r.index,
            text: r[0],
            positions: r[0].split('').map((l, index) => [i, index+r.index])
        }
    }))
    .flat()
    .filter(n => 
        n.positions.some(pos => 
            symbols.map(s => 
                s.positions.some(posS => 
                    `${posS[0]},${posS[1]}` === `${pos[0]},${pos[1]}`
                )
            )
            .reduce((a,b) => a || b, false)
        )
    )
    .reduce((a,b) => a + parseInt(b.text), 0);

    return numbers;
}

function solvePartTwo(data) {
    let colsMax = data[0].length;
    let rowsMax = data.length;   

    let symbols = data.map((d, i) =>  [...d.matchAll(/[*]/g)].map(r => {
        let possiblePositions = []
        
        if (i > 0) {
            possiblePositions.push([i-1, r.index]);
        }

        if (i < rowsMax) {
            possiblePositions.push([i+1, r.index]);
        }

        if (r.index > 0) {
            possiblePositions.push([i, r.index-1]);
        }

        if (r.index < colsMax) {
            possiblePositions.push([i, r.index+1]);
        }

        if (r.index > 0 && i > 0) {
            possiblePositions.push([i-1, r.index-1]);
        }

        if (r.index < colsMax && i > 0) {
            possiblePositions.push([i-1, r.index+1]);
        }

        if (r.index > 0 && i < rowsMax) {
            possiblePositions.push([i+1, r.index-1]);
        }

        if (r.index < colsMax && i < colsMax) {
            possiblePositions.push([i+1, r.index+1]);
        }

        return {
            row: i,
            col: r.index,
            text: r[0],
            positions: possiblePositions
        }
    })).flat();

    let numbers = data.map((d, i) =>  [...d.matchAll(/\d+/g)].map(r => {
        return {
            row: i,
            col: r.index,
            text: r[0],
            positions: r[0].split('').map((l, index) => [i, index+r.index])
        }
    }))
    .flat().filter(n => 
        n.positions.some(pos => 
            symbols.map(s => 
                s.positions.some(posS => 
                    `${posS[0]},${posS[1]}` === `${pos[0]},${pos[1]}`
                )
            )
            .reduce((a,b) => a || b, false)
        )
    );

    return symbols.map(s => {
        let r =  s.positions.map((pos) => {
            let numbersAdjacent = numbers.map(n => {
                return  n.positions.some(posN => `${posN[0]},${posN[1]}` === `${pos[0]},${pos[1]}`) ? parseInt(n.text) : null
            }).filter(f => f !== null);
            return numbersAdjacent;
        }).filter(r => r.length !== 0).flat();
        
        r = [...new Set(r)]
        
        return r
    }).filter(s => s.length === 2).reduce((a,b) => a + b.reduce((a,b) => a*b,1), 0);
}

export const solve = (data) => {
    return [solvePartOne(data), solvePartTwo(data)];
}