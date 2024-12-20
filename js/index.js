const readline = require('readline');
const fs = require('fs/promises');

// Create an interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getSolvedChallenges() {
  const files = await fs.readdir('./', { withFileTypes: true });

  const solvedChallenges = files
    .filter((file) => file.isDirectory() && file.name.match(/^\d+$/))
    .map((folder) => folder.name);

  return solvedChallenges;
}

getSolvedChallenges().then((challenges) => {
  rl.question(
    `Enter a number to see the solution for the challenge:\nValid numbers (${challenges[0]} - ${
      challenges[challenges.length - 1]
    }): `,
    (input) => {
      const number = parseInt(input, 10);

      if (isNaN(number) || !challenges.includes(number.toString())) {
        console.log('That is not a valid number.');
        rl.close();
        return;
      }

      rl.question('Enter the part (1 or 2): ', (part) => {
        const partNumber = parseInt(part, 10);

        if (isNaN(partNumber) || ![1, 2].includes(partNumber)) {
          console.log('That is not a valid part.');
          rl.close();
          return;
        }

        require(`./${number}/part${partNumber}.js`);
        rl.close();
      });
    }
  );
});

// Print a message and wait for user input
