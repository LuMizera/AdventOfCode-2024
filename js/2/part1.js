const fs = require('fs/promises');
const path = require('path');

async function init() {
  const plainInputData = await fs.readFile(path.dirname(__filename) + '/input.txt', 'utf8');

  const resultList = [];

  const result = plainInputData
    .split('\n')
    .map((line) => line.split(' ').map(Number))
    .reduce((acc, line, index) => {
      for (let i = 1; i < line.length - 1; i ++) {
        const lastNumber = line[i - 1];
        const currentNumber = line[i];
        const nextNumber = line[i + 1];

        if (
          validateForHigherSequence(lastNumber, currentNumber, nextNumber) ||
          validateForLowerSequence(lastNumber, currentNumber, nextNumber)
        ) {
          continue;
        }
        return acc;
      }
      return acc + 1;
    }, 0);
  console.log('result :>> ', result);
}

const validValues = [1, 2, 3];

/**
 * @param {number} lastNumber
 * @param {number} currentNumber
 * @param {number} nextNumber
 * @returns {boolean}
 */
function validateForHigherSequence(lastNumber, currentNumber, nextNumber) {
  return validValues.includes(currentNumber - lastNumber) && validValues.includes(nextNumber - currentNumber);
}

/**
 * @param {number} lastNumber
 * @param {number} currentNumber
 * @param {number} nextNumber
 * @returns {boolean}
 */
function validateForLowerSequence(lastNumber, currentNumber, nextNumber) {
  return validValues.includes(lastNumber - currentNumber) && validValues.includes(currentNumber - nextNumber);
}

init();
