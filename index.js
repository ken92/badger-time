const util = require('./util');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let start, finish;

const getUserInput = (prompt, validOptions = null) => {
  return new Promise(async (resolve, reject) => {
    const getFromCommandLine = text => {
      return new Promise((resolve, reject) => {
        readline.question(`${text}\n`, input => {
          resolve(input);
        });
      });
    };

    let input;
    while (!input && (validOptions && validOptions.length ? !validOptions.includes(input) : true)) {
      let _in = await getFromCommandLine(prompt);
      _in = _in.trim().toLowerCase();
      if (validOptions && validOptions.length && !validOptions.includes(_in)) {
        console.log(`  Please pick an option in the following list:  ${validOptions.join(', ')}`);
      } else {
        input = _in;
      }
    }
    resolve(input);
  });
};

const getNumColors = () => {
  return new Promise(async (resolve, reject) => {
    const isValid = c => {
      return !(isNaN(numColors) || numColors <= 0 || numColors >= util.textColors.length);
    };
    let numColors;
    while (!isValid(numColors)) {
      let col = await getUserInput("How many colors?");
      numColors = parseInt(col);
    }
    resolve(numColors);
  });
};

finish = async () => {
  const playAgain = await getUserInput("Would you like to play again? Options: yes, no", ["yes", "no"]);
  if (playAgain === 'yes')
    start();
  else {
    readline.close();
    process.exit(0);
  }
};

start = async () => {
  const numTurns = await getUserInput("How many turns? Options: 10, 12, 8", ["10", "12", "8"]);
  const numColors = await getNumColors();

  console.log(util.textColors.red("asdfasdf"));


  finish();
};
start();

