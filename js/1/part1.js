const fs = require('fs/promises');
const path = require('path');

async function init() {
  let { list1, list2 } = await getNumbersFromInput();

  let result = 0;

  for (let i = 0; i < list1.length; i++) {
    const lowest1 = list1[i];
    const lowest2 = list2[i];

    result += Math.max(lowest1, lowest2) - Math.min(lowest1, lowest2);
  }

  // 1579939 = correct
  console.log('Result: ', result);
}

/**
 * @returns {Promise<{list1: number[], list2: number[]}>}
 */
async function getNumbersFromInput() {
  try {
    const plainInputData = await fs.readFile(path.dirname(__filename) + '/input.txt', 'utf8');

    const list1 = [];
    const list2 = [];

    plainInputData.split('\n').forEach((line) => {
      line.split('   ').forEach((number, index) => {
        if (index === 0) {
          list1.push(Number(number));
          return;
        }

        list2.push(Number(number));
      });
    });

    return { list1: list1.sort((a, b) => a - b), list2: list2.sort((a, b) => a - b) };
  } catch (error) {
    console.log('🚀 ~ getNumbersFromInput ~ error:', error);
  }
}

init();
