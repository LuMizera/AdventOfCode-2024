const fs = require('fs/promises');
const path = require('path');

const regex = /do\(\)|don\'t\(\)|mul\(\d{1,3},\d{1,3}\)/g;

async function init() {
  const input = await fs.readFile(path.dirname(__filename) + '/input.txt', 'utf-8');

  let enabled = true;
  const result = input.match(regex).reduce((acc, item, index) => {
    if (item === 'do()') {
      enabled = true;
      return acc;
    }

    if (item === "don't()") {
      enabled = false;
      return acc;
    }

    if (enabled) {
      return acc + eval(item);
    }
    return acc;
  }, 0);

  console.log('result :>> ', result);
}

function mul(a, b) {
  return a * b;
}

init();
