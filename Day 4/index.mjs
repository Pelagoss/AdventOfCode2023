function solvePartOne(data) {
    return data.map(d => {
        let winning_numbers = d.split(':')[1].split('|')[0].split(' ').filter(f => f !== '').map(m => parseInt(m));
        let my_numbers = d.split(':')[1].split('|')[1].split(' ').filter(f => f !== '').map(m => parseInt(m));

        let r = my_numbers.filter(f => winning_numbers.includes(f))

        r = r.length > 0 ? 2**(r.length-1) : 0;

        return r;
    }).reduce((a, b) => a + b, 0);
}

function solvePartTwo(data) {
    
    data = data.map((d) => {return {data: d, copies: 1}});
    let copied_card = JSON.parse(JSON.stringify(data));
    
    data = data.map((d, i) => {
        let winning_numbers = d.data.split(':')[1].split('|')[0].split(' ').filter(f => f !== '').map(m => parseInt(m));
        let my_numbers = d.data.split(':')[1].split('|')[1].split(' ').filter(f => f !== '').map(m => parseInt(m));

        let r = my_numbers.filter(f => winning_numbers.includes(f))

        let current_card = i;
        
        if (r.length > 0 ) {
            r.forEach(() => {
                current_card++;
                copied_card[current_card].copies += copied_card[i].copies;
            });
        }

        return d;
    })

    return copied_card.reduce((a, b) => a + b.copies, 0);
}

export const solve = (data) => {
    return [solvePartOne(data), solvePartTwo(data)];
}