function solvePartOne(data) {
    return data.map(v => `${v.match(/\d/g).shift()}${v.match(/\d/g).pop()}`).reduce((a, b) => parseInt(a) + parseInt(b), 0);
}

function solvePartTwo(data) {
    let patterns = {
        '1':1,
        '2':2,
        '3':3,
        '4':4,
        '5':5,
        '6':6,
        '7':7,
        '8':8,
        '9':9,
        one:1,
        two:2,
        three:3,
        four:4,
        five:5,
        six:6,
        seven:7,
        eight:8,
        nine:9
    };

    let matchPatterns = (v) => "\\d|one|two|three|four|five|six|seven|eight|nine"
                .split('|')
                .map(r => [
                    ...v.matchAll(new RegExp(`${r}`, 'g'))
                ])
                .filter(f => f.length)
                .flat()
                .sort((a,b) => a.index-b.index)

    return data
    .map(v => 
        `${patterns[matchPatterns(v).shift()[0]]}${patterns[matchPatterns(v).pop()[0]]}`
    ).reduce((a, b) => parseInt(a) + parseInt(b), 0);
}

export const solve = (data) => {
    return [solvePartOne(data), solvePartTwo(data)];
}