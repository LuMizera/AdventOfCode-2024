const fs = require('fs/promises');
const path = require('path');

/**
 * @param {Map<number, number>} hashMapLeft
 * @param {Map<number, number>} hashMapRight
 * @returns {number}
 */
async function calculateSimiliarityScore(hashMapLeft, hashMapRight) {
  let result = 0;

  hashMapLeft.entries().forEach(([key]) => {
    if (hashMapRight.has(key)) {
      result += key * hashMapRight.get(key);
    }
  });

  return result;
}

fs.readFile(path.dirname(__filename) + '/input.txt', 'utf8').then((plainInputData) => {
  const hashMapLeft = new Map();
  const hashMapRight = new Map();

  plainInputData.split('\n').forEach((line) => {
    const [valueLeft, valueRight] = line.split('   ');

    hashMapLeft.has(Number(valueLeft))
      ? hashMapLeft.set(Number(valueLeft), hashMapLeft.get(Number(valueLeft)) + 1)
      : hashMapLeft.set(Number(valueLeft), 1);

    hashMapRight.has(Number(valueRight))
      ? hashMapRight.set(Number(valueRight), hashMapRight.get(Number(valueRight)) + 1)
      : hashMapRight.set(Number(valueRight), 1);
  });

  const similiatiry = calculateSimiliarityScore(hashMapLeft, hashMapRight);
  console.log('🚀 ~ fs.readFile ~ similiatiry:', similiatiry);
});
