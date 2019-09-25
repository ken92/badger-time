const util = require('./util');

class Game {
  constructor(numTurns, numColors, lengthOfCode) {
    this.numTurns = numTurns;
    this.numColors = numColors;
    this.lengthOfCode = lengthOfCode;
    this.code = this.generateCode();
    // white: { color: colors.white, label: 'w' }
  }

  generateCode() {
    return "roygbiv";
  }

  play() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

module.exports = Game;
