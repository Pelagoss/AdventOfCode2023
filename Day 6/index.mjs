function solvePartOne(data) {
    let times = data[0].match(/\d+/g).map((t) => parseInt(t));
    let distances = data[1].match(/\d+/g).map((d) => parseInt(d));

    return times.map((time, i) => {
        let distance = distances[i];
        let delta = (time**2) - 4 * (-1) * (-1 * distance)
        let x1 = Math.ceil((-time + Math.sqrt(delta)) / (-2));
        let x2 = Math.ceil((-time - Math.sqrt(delta)) / (-2));
        
        return x2-x1;
    }).reduce((a,b) => a*b,1);    
}

function solvePartTwo(data) {
    let time = parseInt(data[0].match(/\d+/g).join(''));
    let distance = parseInt(data[1].match(/\d+/g).join(''));

    let delta = (time**2) - 4 * (-1) * (-1 * distance)
    let x1 = Math.ceil((-time + Math.sqrt(delta)) / (-2));
    let x2 = Math.ceil((-time - Math.sqrt(delta)) / (-2));
    
    return x2-x1;
}

export const solve = (data) => {
    return [solvePartOne(data), solvePartTwo(data)];
}