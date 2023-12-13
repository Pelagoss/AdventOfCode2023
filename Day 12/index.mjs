import { Worker } from "worker_threads";

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

        return {springs, groups}
    })

    let chunkSize  = Math.floor(data.length/4);

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