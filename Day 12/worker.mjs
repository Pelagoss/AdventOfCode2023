import { workerData, parentPort } from "worker_threads";

function memoize(func) {
    const stored = new Map();

    return (...args) => {
        const k = JSON.stringify(args);
        if (stored.has(k)) {
        return stored.get(k);
        }
        const result = func(...args);
        stored.set(k, result);
        return result;
    };
}

const countWays = memoize((line, runs) => {
    if (line.length === 0) {
        if (runs.length === 0) {
        return 1;
        }
        return 0;
    }
    if (runs.length === 0) {
        for (let i = 0; i < line.length; i++) {
        if (line[i] === "#") {
            return 0;
        }
        }
        return 1;
    }

    if (line.length < runs.reduce((a, b) => a + b, 0) + runs.length - 1) {
        return 0;
    }

    if (line[0] === ".") {
        return countWays(line.slice(1), runs);
    }
    if (line[0] === "#") {
        const [run, ...leftoverRuns] = runs;
        for (let i = 0; i < run; i++) {
        if (line[i] === ".") {
            return 0;
        }
        }
        if (line[run] === "#") {
        return 0;
        }

        return countWays(line.slice(run + 1), leftoverRuns);
    }

    return (
        countWays("#" + line.slice(1), runs) + countWays("." + line.slice(1), runs)
    );
});


parentPort.postMessage(workerData.data.map((d) => countWays(d.springs, d.groups)).reduce((a, b) => a + b, 0));