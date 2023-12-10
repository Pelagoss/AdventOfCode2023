const symbolsDirections = {
    '|': {
        directions: ['t', 'b']
    },
    '-': {
        directions: ['l', 'r']
    },
    'L': {
        directions: ['t', 'r']
    },
    'J': {
        directions: ['l', 't']
    },
    '7': {
        directions: ['b', 'l']
    },
    'F': {
        directions: ['b', 'r']
    },
    'S': {
        directions: ['l', 'r', 't', 'b']
    }
}

function solvePartOne(data) {
    let colsMax = data[0].length;
    let rowsMax = data.length;

    let startingSymbol = null;

    let symbols = data.map((d, i) =>  [...d.matchAll(/[^.]/g)].map(r => {
        
        let possiblePositions = []
        
        let d = symbolsDirections[r[0]].directions;

        d.forEach((e) => {
            if (e === 't' && i > 0) {
                possiblePositions.push([i-1, r.index]);
            }

            if (e === 'b' && i < rowsMax) {
                possiblePositions.push([i+1, r.index]);
            }
            
            if (e === 'l' && r.index > 0) {
                possiblePositions.push([i, r.index-1]);
            }

            if (e === 'r' && r.index < colsMax) {
                possiblePositions.push([i, r.index+1]);
            }
        })

        let o = {
            row: i,
            col: r.index,
            text: r[0],
            positions: possiblePositions
        }
        
        if (o.text === 'S') {
            startingSymbol = o;
        }

        return o;
    })).flat();

    let currentSymbol = JSON.parse(JSON.stringify(startingSymbol));
    let lastPos = null;
    let eloignement = 0;

    do {
        let possibleNext = Object.entries(symbols).filter((s) => {
            return currentSymbol.positions.some((csP) => {
                return csP[0] === s[1].row && 
                csP[1] === s[1].col && 
                s[1].positions.map((p) => p[0]).includes(currentSymbol.row) && 
                s[1].positions.map((p) => p[1]).includes(currentSymbol.col) && 
                JSON.stringify(s[1]) !== JSON.stringify(lastPos) && 
                JSON.stringify(s[1]) !== JSON.stringify(currentSymbol)
            })
        });

        lastPos = JSON.parse(JSON.stringify(currentSymbol));
        
        currentSymbol = possibleNext[0][1];

        eloignement++;
    } while (currentSymbol?.text !== startingSymbol.text)

    return eloignement/2;
}

function solvePartTwo(data) {
    let colsMax = data[0].length;
    let rowsMax = data.length;

    let startingSymbol = null;

    let symbols = data.map((d, i) =>  [...d.matchAll(/[^.]/g)].map(r => {
        
        let possiblePositions = []
        
        let d = symbolsDirections[r[0]].directions;

        d.forEach((e) => {
            if (e === 't' && i > 0) {
                possiblePositions.push([i-1, r.index]);
            }

            if (e === 'b' && i < rowsMax) {
                possiblePositions.push([i+1, r.index]);
            }
            
            if (e === 'l' && r.index > 0) {
                possiblePositions.push([i, r.index-1]);
            }

            if (e === 'r' && r.index < colsMax) {
                possiblePositions.push([i, r.index+1]);
            }
        })

        let o = {
            row: i,
            col: r.index,
            text: r[0],
            positions: possiblePositions
        }
        
        if (o.text === 'S') {
            startingSymbol = o;
        }

        return o;
    })).flat();

    let currentSymbol = JSON.parse(JSON.stringify(startingSymbol));
    let lastPos = null;
    let points = {};

    do {
        let possibleNext = Object.entries(symbols).filter((s) => {
            return currentSymbol.positions.some((csP) => {
                return csP[0] === s[1].row && 
                csP[1] === s[1].col && 
                s[1].positions.map((p) => p[0]).includes(currentSymbol.row) && 
                s[1].positions.map((p) => p[1]).includes(currentSymbol.col) && 
                JSON.stringify(s[1]) !== JSON.stringify(lastPos) && 
                JSON.stringify(s[1]) !== JSON.stringify(currentSymbol)
            })
        });

        lastPos = JSON.parse(JSON.stringify(currentSymbol));
        
        currentSymbol = possibleNext[0][1];

        points[`${currentSymbol.col},${currentSymbol.row}`] = currentSymbol;
    } while (currentSymbol?.text !== startingSymbol.text)

    let tile_count = 0;

    data.forEach((line, y) => {
        let parity = 0;
        line = line.split('');

        for (let x = 0; x < line.length; x++) {
            if (!Object.keys(points).includes(`${x},${y}`)) {
                if (parity % 2 == 1) {
                    tile_count += 1
                }
                continue;
            }
            
            if (['|', 'L', 'J'].includes(line[x])) {
                parity += 1;
            }
            
        }
    })

    return tile_count;
}

export const solve = (data) => {
    return [solvePartOne(data), solvePartTwo(data)];
}