function computeVertical(part, d) {
    let transposed = part[0].split('').map((_, colIndex) => [...part.map(row => row[colIndex])].reverse().join(''));
    
    return computeHorizontal(transposed, d);
}
function D(a, b) {return a.split('').map((_, k) => a[k] != b[k]).reduce((x, y) => x + y, 0)}
function computeHorizontal(m, s) {
    for (let k = 1; k < m.length; k++) {
        let l = k, u = m;
        if (k > m.length / 2) { u = u.slice(0).reverse(); l = m.length - k }
        let a = u.slice(0, l).join('')
        let b = u.slice(l, 2 * l).reverse().join('')
        if (s == D(a, b)) {
            return k
        }
    } return 0
}

function solvePartOne(data, d = 0) {
    let parts = [[]];
    let i = 0;

    data.forEach(element => {
        if (element !== '') {
            parts[i].push(element);
        } else {
            parts.push([]);
            i++;
        }
    });

    let vertical = 0;
    let horizontal = 0;

    parts.forEach(element => {
        vertical += computeVertical(element, d);
        horizontal += computeHorizontal(element, d);
    });

    return (vertical) + (100 * horizontal);
}

function solvePartTwo(data) {
    return solvePartOne(data, 1);
}

export const solve = (data) => {
    return [solvePartOne(data), solvePartTwo(data)];
}