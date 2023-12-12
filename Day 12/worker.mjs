import { workerData, parentPort } from "worker_threads";

function get_possible_count(springs, groups, prev_size = 0, must_operational = false, cache) {
    cache = cache || {};
    
    let cacheKey = JSON.parse(JSON.stringify({springs, groups, prev_size, must_operational}));

    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

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


parentPort.postMessage(workerData.data.map((d) => get_possible_count(d.springs, d.groups)).reduce((a, b) => a + b, 0));