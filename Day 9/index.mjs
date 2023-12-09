function solvePartOne(data) {
    return data.map((element, line) => {
        let numbers = element.split(' ').map((n) => parseInt(n));

        let copyNumbers = JSON.parse(JSON.stringify(numbers));
        let steps = [copyNumbers]
        
        
        while (copyNumbers.some((n) => n !== 0)) {
            let i = 0;
            let differences = [];

            while(i < copyNumbers.length-1) {
                differences.push(copyNumbers[i+1] - copyNumbers[i])
                i++;
            }

            steps.push(differences)
            copyNumbers = JSON.parse(JSON.stringify(differences));
        }

        steps.reverse();

        steps[0].push(0)
        
        let j = 0;
        let last_number = 0;
        while(j < steps.length-1) {
            last_number = steps[j+1][steps[j+1].length - 1] + last_number;
            steps[j+1].push(last_number)
            j++;
        }
        
        return last_number
    }).reduce((a, b) => a + b, 0);
}

function solvePartTwo(data) {
    data = data.map((element, line) => {
        let numbers = element.split(' ').map((n) => parseInt(n));

        numbers.reverse()

        return numbers.join(' ');
    })

    return solvePartOne(data);
}

export const solve = (data) => {
    return [solvePartOne(data), solvePartTwo(data)];
}