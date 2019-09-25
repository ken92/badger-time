const util = require('./util');

class Game {
  constructor(numTurns, numColors, lengthOfCode) {
    this.numTurns = numTurns;
    this.currentTurn = 1;
    this.ready = false;
    this.running = true;
    this.initialize(numColors, lengthOfCode);
  }

  async initialize(numColors, lengthOfCode) {
    this.colorOptions = await this.getColorOptions(numColors);
    this.code = await this.generateCode(lengthOfCode);
    this.ready = true;
  }

  getColorOptions(numColors) {
    return new Promise(resolve => {
      let colorKeys = Object.keys(util.textColors);
      let options = [];
      for (let i = 0; i < numColors; i++) {
        const randomIndex = util.getRandomInt(0, colorKeys.length - 1);
        options.push(util.textColors[colorKeys[randomIndex]]);
        colorKeys.splice(randomIndex, 1);
      }
      resolve(options);
    });
  }

  generateCode(lengthOfCode) {
    let code = [];
    for (let i = 0; i < lengthOfCode; i++) {
      const randomIndex = util.getRandomInt(0, this.colorOptions.length - 1);
      code.push(this.colorOptions[randomIndex]);
    }
    return code;
  }

  colorOptionsToString() {
    return this.colorOptions.map(c => c.toString()).join('');
  }

  async guessRound() {
    return new Promise((resolve, reject) => {
      console.log(`Color choices: ${this.colorOptionsToString()}`);
      this.running = false;
      resolve();
    });
  }

  play() {
    const waitUntilReady = () => {
      return new Promise((resolve, reject) => {
        const wait = () => {
          if (this.ready)
            resolve();
          else {
            setTimeout(wait, 100);
          }
        };
        wait();
      });
    };

    return new Promise(async (resolve, reject) => {
      await waitUntilReady();

      while (this.running) {
        await this.guessRound();
      };

      resolve();
    });
  }
}

module.exports = Game;
