const util = require('./util');
const Game = require('./game');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let start, finish;

const getUserInput = (prompt, options = {}) => {
  return new Promise(async (resolve, reject) => {
    const { validOptions, type = "string", min, max } = options;
    const getFromCommandLine = text => {
      return new Promise((resolve, reject) => {
        readline.question(`${text}\n`, input => {
          resolve(input);
        });
      });
    };

    const isValid = input => {
      if (validOptions && validOptions.length && !validOptions.includes(input)) {
        return `Please pick an option in the following list:  ${validOptions.join(', ')}`;
      } else if (type === 'int') {
        const num = parseInt(input);
        if (isNaN(num))
          return `Please enter a number`;
        if (min !== undefined && max !== undefined && (input < min || input > max))
          return `Please enter a number between ${min} and ${max}`;
        if ((min !== undefined && input < min))
          return `Please enter a number greater than ${min}`;
        if ((max !== undefined && input > max))
          return `Please enter a number less than ${max}`;
      }
      return null;
    };

    let input;
    while (!input && (validOptions && validOptions.length ? !validOptions.includes(input) : true)) {
      let _in = await getFromCommandLine(prompt);
      _in = _in.trim().toLowerCase();

      const invalidMessage = isValid(_in);
      if (invalidMessage) {
        console.log(`  ${invalidMessage}\n`);
      } else {
        input = _in;
      }
    }
    resolve(input);
  });
};

finish = async () => {
  const playAgain = await getUserInput("Would you like to play again? Options: yes, no", { validOptions: ["yes", "no"] });
  if (playAgain === 'yes')
    start();
  else {
    readline.close();
    process.exit(0);
  }
};

start = async () => {
  const lengthOfCode = await getUserInput("Length of code?", { min: 4, max: 30, type: "int" });
  const numTurns = await getUserInput("How many turns?", { min: 4, max: 20, type: "int" });
  const numColors = await getUserInput("How many colors?", { min: 2, max: Object.keys(util.textColors).length, type: "int" });

  const game = new Game(numTurns, numColors, lengthOfCode);
  await game.play();

  finish();
};
start();

