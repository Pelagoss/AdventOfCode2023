function solvePartOne(data) {
    let seeds = data.shift().match(/\d+/g); 
    let steps = {};
    let stepsKeys = [];
    data.shift()
      
    while (data.length > 0) {
        let labelStep = data.shift();
        stepsKeys.push(labelStep);
        let indexTrou = data.findIndex(d => d === '');
        steps[labelStep] = data.slice(0, indexTrou !== -1 ? indexTrou : data.length);
        data = indexTrou !== -1 ? data.slice(indexTrou+1) : [];
    }

    stepsKeys.forEach((sk) => {
        steps[sk] = steps[sk].map(step => {
            let [destination, source, length] = step.split(' ');
            return {destination: parseInt(destination), source: parseInt(source), length: parseInt(length)};
        });
    });

    seeds = seeds.map((seed) => parseInt(seed)).map((seed) => {
        stepsKeys.forEach((sk) => {
            let copySeed = JSON.parse(JSON.stringify(seed));
            steps[sk].forEach((step) => {
                if (seed === copySeed && step.source <= seed && step.source + (step.length-1) >= seed) {
                    seed = Math.abs(seed - (step.source-step.destination));
                }
            })
        });
        return seed;
    }).reduce((a,b) => Math.min(a, b), Number.MAX_VALUE);

    return seeds;
}

function solvePartTwo(data) {
    let seeds = data.shift().match(/\d+ \d+/g);

    let steps = {};
    let stepsKeys = [];
    data.shift()
      
    while (data.length > 0) {
        let labelStep = data.shift();
        stepsKeys.push(labelStep);
        let indexTrou = data.findIndex(d => d === '');
        steps[labelStep] = data.slice(0, indexTrou !== -1 ? indexTrou : data.length);
        data = indexTrou !== -1 ? data.slice(indexTrou+1) : [];
    }

    stepsKeys.forEach((sk) => {
        steps[sk] = steps[sk].map(step => {
            let [destination, source, length] = step.split(' ');
            return {destination: parseInt(destination), source: parseInt(source), length: parseInt(length)};
        });
    });

    let newSeeds = [];
    seeds.forEach((seed) => {
        let startingSeed = parseInt(seed.split(' ')[0]);
        let i = startingSeed;

        while( i < (startingSeed+parseInt(seed.split(' ')[1]))) {
            stepsKeys.forEach((sk) => {
                let copySeed = JSON.parse(JSON.stringify(i));
                steps[sk].forEach((step) => {
                    if (i === copySeed && step.source <= i && step.source + (step.length-1) >= i) {
                        i = Math.abs(i - (step.source-step.destination));
                    }
                })
            });

            newSeeds.push(i);

            i++;
        }

    })

    console.log(newSeeds)

    seeds = newSeeds.map((seed) => parseInt(seed)).map((seed) => {
        stepsKeys.forEach((sk) => {
            let copySeed = JSON.parse(JSON.stringify(seed));
            steps[sk].forEach((step) => {
                if (seed === copySeed && step.source <= seed && step.source + (step.length-1) >= seed) {
                    seed = Math.abs(seed - (step.source-step.destination));
                }
            })
        });
        return seed;
    }).reduce((a,b) => Math.min(a, b), Number.MAX_VALUE)

    return seeds;
}

export const solve = (data) => {
    return [solvePartOne(JSON.parse(JSON.stringify(data))), solvePartTwo(JSON.parse(JSON.stringify(data)))];
}