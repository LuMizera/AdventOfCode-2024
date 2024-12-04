const fs = require('fs/promises');
const path = require('path');

const regex = /mul\(\d{1,3},\d{1,3}\)/g;

async function init() {
  const input = await fs.readFile(path.dirname(__filename) + '/input.txt', 'utf-8');

  const result = input.match(regex).reduce((acc, item) => {
    return acc + eval(item);
  }, 0);
  console.log('🚀 ~ result ~ result:', result);
}

function mul(a, b) {
  return a * b;
}

init();
