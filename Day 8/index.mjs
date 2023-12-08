function solvePartOne(data) {
    let directions = data[0].split('')

    let nodes =  {};

    data.slice(2).forEach((n, i) => {
        let key = n.split(' = ')[0];
        let node = {
            key: key,
            L: n.match(/\(([A-Z]+), [A-Z]+\)/)[1],
            R: n.match(/\([A-Z]+, ([A-Z]+)\)/)[1]
        };

        nodes[key] = node;
    });
    
    let i = 0;

    let currentNode = nodes['AAA'];
    let finishingNode = nodes['ZZZ'];

    while(true) {
        let dir = directions[i%directions.length];
        
        currentNode = nodes[currentNode[dir]];

        i++

        if (currentNode.key === finishingNode.key) {
            break;
        }
    }

    return i;
}

function solvePartTwo(data) {
    let directions = data[0].split('')

    let nodes =  {};

    data.slice(2).forEach((n, i) => {
        let key = n.split(' = ')[0];
        let node = {
            key: key,
            L: n.match(/\(([A-Z]+), [A-Z]+\)/)[1],
            R: n.match(/\([A-Z]+, ([A-Z]+)\)/)[1]
        };

        nodes[key] = node;
    });
    
    let i = 0;

    let currentNodes = Object.entries(nodes).filter(([key, value]) => value.key.split('').pop() === 'A');

    while(true) {
        let dir = directions[i%directions.length];
        
        currentNodes = currentNodes.map((cN) => {
            return [nodes[cN[1][dir]].key, nodes[cN[1][dir]]]
        });

        i++

        if (currentNodes.every((cN) => cN[0].split('').pop() === 'Z')) {
            break;
        }
    }

    return i;
}

export const solve = (data) => {
    return [solvePartOne(data), solvePartTwo(data)];
}