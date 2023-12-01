function solvePartOne(data) {
    return data.map(v => `${v.match(/\d/g)[0]}${v.match(/\d/g)[v.match(/\d/g).length-1]}`).reduce((a, b) => parseInt(a) + parseInt(b), 0);
}

function solvePartTwo(data) {
    return data
    .map(v => 
        `${
            (
                {
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
                }
            )[
                "\\d|one|two|three|four|five|six|seven|eight|nine"
                .split('|')
                .map(r => [
                    ...v.matchAll(new RegExp(`${r}`, 'g'))
                ])
                .filter(f => f.length)
                .flat()
                .sort((a,b) => a.index-b.index)
                [0]
                [0]
            ]
        }
        ${
            (
                {
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
                }
            )[
                "\\d|one|two|three|four|five|six|seven|eight|nine"
                .split('|')
                .map(r => [
                    ...v.matchAll(new RegExp(`${r}`, 'g'))
                ])
                .filter(f => f.length)
                .flat()
                .sort((a,b) => a.index-b.index)
                .pop()
                [0]
            ]
        }`
    ).reduce((a, b) => parseInt(a) + parseInt(b), 0);
}

export const solve = (data) => {
    return [solvePartOne(data), solvePartTwo(data)];
}