function extendGrid(data, galaxies, n) {
    let indices = data.map((item, index) => ({ item, index })).filter((d) => !d.item.includes('#'));

    indices.forEach((element, i) => {
        galaxies = galaxies.map((g) => {
            if (g.y > element.index + ((n-1) * i)) {
                g.y = g.y + (n - 1);
            }

            return g;
        })
    });
    
    let realLength = JSON.parse(JSON.stringify(data))[0].length;
    
    let i = 0;
    indices = [];
    
    while (i < realLength) {
        if (data.every((line) => line[i] === '.')) {
            indices.push(i);
        }
        i++;
    }
    
    galaxies = galaxies.map((g) => {
        let multiplier = indices.filter((e) => e < g.x).length;
        
        if (multiplier > 0) {
            g.x = g.x + ((n - 1)*multiplier);
        }

        return g;
    });

    return data;
}

function solvePartOne(data, n = 2) {
    let galaxies = data.map((d, i) =>  [...d.matchAll(/#/g)].map(r => {
        return {
            x: r.index,
            y: i
        };
    })).flat();
    
    extendGrid(data, galaxies, n);
    
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
    return solvePartOne(data, 1000000);
}

export const solve = (data) => {
    return [solvePartOne(JSON.parse(JSON.stringify(data))), solvePartTwo(JSON.parse(JSON.stringify(data)))];
}