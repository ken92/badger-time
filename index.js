const util = require('./util');
const Game = require('./game');

let start, finish;

finish = async () => {
  const playAgain = await util.getUserInput("Would you like to play again? Options: yes, no", { validOptions: ["yes", "no"] });
  if (playAgain === 'yes')
    start();
  else {
    util.cleanup();
    process.exit(0);
  }
};

start = async () => {
  const lengthOfCode = await util.getUserInput("Length of code?", { min: 4, max: 30, type: "int" });
  const numTurns = await util.getUserInput("How many turns?", { min: 4, max: 20, type: "int" });
  const numColors = await util.getUserInput("How many colors?", { min: 2, max: Object.keys(util.textColors).length, type: "int" });

  const game = new Game(numTurns, numColors, lengthOfCode);
  await game.play();

  finish();
};
start();

