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

folders.forEach((d,i) => console.log(`${i+1} - ${d}`))

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
rl.question(`\nWhich day wanna you solve ? \x1b[32m[${folders.length}]\x1b[0m `, (day) => {
  if (day === "") {
    day = folders.length;
  }

  if (folders.every(f => f !== `Day ${day}`)) {
    console.log(`Invalid day, stopping ...`);  
    exit();
  } else {
    
    import(`./Day ${day}/index.mjs`).then((dayScript) => {
      let data = readFileSync(`./Day ${day}/data`).toString().replaceAll('\n', ',').split(',');

      let solutions = dayScript.solve(data);

      console.group("\x1b[1m\x1b[32m%s\x1b[0m", `Solutions of day ${day}`);
      console.table(
          [{ "Part One": solutions[0], "Part Two": solutions[1] }]
      )
      console.groupEnd();
    });
  }

  rl.close();
});