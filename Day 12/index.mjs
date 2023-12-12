import { Worker } from "worker_threads";

function get_possible_count(springs, groups, prev_size = 0, must_operational = false) {
    if (springs == "") {
        if (groups.length > 0) {
            if (groups.length == 1 && groups[0] == prev_size) {
                return 1;
            }

            return 0;
        } else {
            if (prev_size == 0) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    if (groups.length == 0) {
        if (springs.includes("#") || prev_size > 0) {
            return 0;
        }
        
        return 1;
    }
    
    let curr = springs[0];
    let rest = springs.slice(1);

    if (curr == "?") {
        return get_possible_count("#" + rest, groups, prev_size, must_operational) + get_possible_count("." + rest, groups, prev_size, must_operational);
    }

    if (curr == "#") {
        if (must_operational) {
            return 0;
        }

        let curr_size = prev_size + 1;

        if (curr_size > groups[0]) {
            return 0;
        } else if (curr_size == groups[0]) {
            return get_possible_count(rest, groups.slice(1), 0, true);
        } else {
            return get_possible_count(rest, groups, curr_size, false);
        }
    }
    
    if (curr == ".") {
        if (must_operational === true) {
            return get_possible_count(rest, groups, 0, false);
        }
        
        if (prev_size == 0) {
            return get_possible_count(rest, groups, 0, false);
        } else {
            if (prev_size != groups[0]) {
                return 0;
            } else {
                return get_possible_count(rest, groups.slice(1), 0, false);
            }
        }
    }
}

function createWorker(data) {
    return new Promise(function (resolve, reject) {
        let worker = new Worker("./Day 12/worker.mjs", {
            workerData: { data },
        });

        worker.on("message", (data) => {
            resolve(data);
        });
        
        worker.on("error", (msg) => {
            reject(`An error ocurred: ${msg}`);
        });
    });
}

async function solvePartOne (data) {
    let workerPromises = [];

    data = data.map((line) => {
        let parts = line.split(' ');

        let springs = parts[0];
        let groups = parts[1].split(',').map((g) => parseInt(g));

        return {springs, groups};
    })

    let chunkSize  = Math.floor(data.length/6);

    for (let i = 0; i < data.length; i += chunkSize) {
        workerPromises.push(createWorker(data.slice(i, i + chunkSize)));
    }

    return await (await Promise.all(workerPromises)).reduce((a, b) => a + b, 0);
}

function solvePartTwo(data) {
    let fiveData = data.map((line) => {
        let parts = line.split(' ');

        let springs = parts[0];
        let groups = parts[1].split(',').map((g) => parseInt(g));
        
        return [springs, springs, springs, springs, springs].join('?') + ' ' + [...groups, ...groups, ...groups, ...groups, ...groups].join(',');
    })

    return solvePartOne(fiveData);
}

export const solve = async (data) => {
    return [await solvePartOne(data), await solvePartTwo(data)];
}