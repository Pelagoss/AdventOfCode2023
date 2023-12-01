import { readdirSync, readFileSync } from 'fs';
import { exit } from 'process';
import * as readline from "readline";

console.log("\x1b[1m\x1b[32m%s\x1b[0m", `Advent of code 2023`);
console.log("List of available solutions :\n");

const getDirectories = (source = '.') =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.includes('Day'))
    .map(dirent => dirent.name);

let folders = getDirectories();

folders.forEach((d,i) => console.log(`${(i+1)===folders.length ? '\x1b[32m' : '\x1b[33m'}${i+1 < 10 ? ` ${i+1} ` : `${i+1} `}${(i+1)===folders.length ? '' : '\x1b[0m'} - ${d}\x1b[0m`))
console.log(`\x1b[33mall\x1b[0m - Run all solutions`)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
rl.question(`\nWhich day's solution wanna you see ? \x1b[32m[${folders.length}]\x1b[0m `, (day) => {
  if (day === "") {
    day = folders.length;
  }

  if (folders.every(f => f !== `Day ${day}`) && day !== 'all') {
    console.log(`Invalid day, stopping ...`);  
    exit();
  } else {
    day = day === 'all' ? Array.from({length: folders.length}, (_, i) => i + 1) : [day];
    
    day.forEach( day => {
      import(`./Day ${day}/index.mjs`).then((dayScript) => {
        let data = readFileSync(`./Day ${day}/data`).toString().replaceAll('\n', ',').split(',');
  
        let solutions = dayScript.solve(data);
  
        console.group("\x1b[1m\x1b[32m%s\x1b[0m", `Solutions of day ${day}`);
        console.table(
            [{ "Part One": solutions[0], "Part Two": solutions[1] }]
        )
        console.groupEnd("============================================================\n");
      });
    })
  }

  rl.close();
});