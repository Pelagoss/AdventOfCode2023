function doubleGrid(data) {
    let indices = data.map((item, index) => ({ item, index })).filter((d) => !d.item.includes('#'));

    indices.forEach((element) => {
        data.splice(element.index+1, 0, element.item);
    });

    let realLength = JSON.parse(JSON.stringify(data))[0].length;

    let i = 0;
    while (i < realLength) {
        if (data.every((line) => line[i] === '.')) {
            data = data.map((d) => {
                let newLine = d.split('');
                newLine.splice(i, 0, '.')
                return newLine.join('');
            });

            realLength++;
            i++;
        }
        i++;
    }

    return data;
}

function solvePartOne(data) {
    data = doubleGrid(data);

    let galaxies = data.map((d, i) =>  [...d.matchAll(/#/g)].map(r => {
        let o = {
            x: r.index,
            y: i
        }
        return o;
    })).flat();

    let sum = 0;

    while (galaxies.length > 1) {
        let currentGalaxy = galaxies.shift();

        sum += galaxies.map((g) => {
            return Math.abs(currentGalaxy.x - g.x) + Math.abs(currentGalaxy.y - g.y)
        }).reduce((a, b) => a + b, 0);
    }

    return sum;
}

function solvePartTwo(data) {
    return undefined;
}

export const solve = (data) => {
    return [solvePartOne(JSON.parse(JSON.stringify(data))), solvePartTwo(JSON.parse(JSON.stringify(data)))];
}