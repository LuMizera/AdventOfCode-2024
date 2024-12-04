const fs = require('fs/promises');
const path = require('path');

/**
 * @param {number[]} leftList
 * @param {number[]} rightList
 * @returns {number}
 */
async function calculateDistance(leftList, rightList) {
  let result = 0;

  for (let i = 0; i < leftList.length; i++) {
    result += Math.abs(leftList[i] - rightList[i]);
  }

  return result;
}

fs.readFile(path.dirname(__filename) + '/input.txt', 'utf8').then((plainInputData) => {
  const listLeft = [];
  const listRight = [];

  plainInputData.split('\n').forEach((line) => {
    const [valueLeft, valueRight] = line.split('   ').forEach((number, index) => {
      listLeft.push(Number(valueLeft));
      listRight.push(Number(valueRight));
    });
  });

  listLeft.sort((a, b) => a - b);
  listRight.sort((a, b) => a - b);

  const distance = calculateDistance(listLeft, listRight);
  console.log("🚀 ~ fs.readFile ~ distance:", distance)
});
