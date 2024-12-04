const fs = require('fs/promises');
const path = require('path');

async function init() {
  let { hashMap1, hashMap2 } = await getNumbersFromInput();

  let result = 0;

  hashMap1.entries().forEach(([key]) => {
    if (hashMap2.has(key)) {
      result += key * hashMap2.get(key);
    }
  });

  // 20351745 = correct
  console.log('Result: ', result);
}

/**
 * @returns {Promise<{hashMap1: Map, hashMap2: Map}>}
 */
async function getNumbersFromInput() {
  try {
    const plainInputData = await fs.readFile(path.dirname(__filename) + '/input.txt', 'utf8');

    const hashMap1 = new Map();
    const hashMap2 = new Map();

    plainInputData.split('\n').forEach((line) => {
      line.split(' ').forEach((number, index) => {
        if (!number.trim()) {
          return;
        }

        if (index === 0) {
          hashMap1.has(Number(number))
            ? hashMap1.set(Number(number), hashMap1.get(Number(number)) + 1)
            : hashMap1.set(Number(number), 1);
          return;
        }
        hashMap2.has(Number(number))
          ? hashMap2.set(Number(number), hashMap2.get(Number(number)) + 1)
          : hashMap2.set(Number(number), 1);
      });
    });
    return { hashMap1, hashMap2 };
  } catch (error) {
    console.log('🚀 ~ getNumbersFromInput ~ error:', error);
  }
}

init();
