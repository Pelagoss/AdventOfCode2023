function solvePartOne(data) {
    return data.map(v => {
        let game = v.match(/Game (\d+): (.*)/)

        return {
            id: game[1], 
            data: game[2]
            .split(';')
            .map(v2 => 
                v2.split(',')
                .reduce((a,b) => 
                    {
                        b = b.match(/(?<red>\d+) red|(?<blue>\d+) blue|(?<green>\d+) green/);
                        return {
                            red: a.red + parseInt(b.groups.red ?? 0), 
                            blue: a.blue + parseInt(b.groups.blue ?? 0), 
                            green: a.green + parseInt(b.groups.green ?? 0)
                        };
                    }, 
                    {red:0, blue:0, green: 0}
                )
            )
            .every(o => o.red <= 12 && o.green <= 13 && o.blue <= 14)
        };
    })
    .filter(d => d.data)
    .reduce((a, b) => a+parseInt(b.id), 0);
}

function solvePartTwo(data) {
    return data.map(v => {
        let game = v.match(/Game (\d+): (.*)/)

        return {
            id: game[1], 
            data: [
                game[2]
                .split(';')
                .map(v2 => 
                    v2.split(',')
                    .reduce((a,b) => 
                        {
                            b = b.match(/(?<red>\d+) red|(?<blue>\d+) blue|(?<green>\d+) green/);
                            return {
                                red: a.red + parseInt(b.groups.red ?? 0), 
                                blue: a.blue + parseInt(b.groups.blue ?? 0), 
                                green: a.green + parseInt(b.groups.green ?? 0)
                            };
                        }, 
                        {red:0, blue:0, green: 0}
                    )
                )
                .reduce((a,b) => 
                    {
                        return {
                            red: Math.max(a.red, b.red),
                            blue: Math.max(a.blue, b.blue), 
                            green: Math.max(a.green, b.green)
                        };
                    }, 
                    {red:0, blue:0, green: 0}
                )
            ]
            .map((a) => a.red * a.green * a.blue)
            .shift()
        };
    })
    .reduce((a, b) => a + b.data, 0);
}

export const solve = (data) => {
    return [solvePartOne(data), solvePartTwo(data)];
}