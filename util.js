const colors = require('colors');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const textColors = {
  red: { color: colors.red, label: 'r', toString: () => 'r'.red },
  green: { color: colors.green, label: 'g', toString: () => 'g'.green },
  yellow: { color: colors.yellow, label: 'y', toString: () => 'y'.yellow },
  blue: { color: colors.blue, label: 'b', toString: () => 'b'.bgWhite.blue },
  magenta: { color: colors.magenta, label: 'm', toString: () => 'm'.magenta },
  cyan: { color: colors.cyan, label: 'c', toString: () => 'c'.cyan },
  white: { color: colors.white, label: 'w', toString: () => 'w'.white }
};

const backgroundColors = {
  red: colors.bgRed,
  green: colors.bgGreen,
  yellow: colors.bgYellow,
  blue: colors.bgBlue,
  magenta: colors.bgMagenta,
  cyan: colors.bgCyan,
  white: colors.bgWhite
};

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

const cleanup = () => {
  readline.close();
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
  textColors,
  backgroundColors,
  getUserInput,
  cleanup,
  getRandomInt
};
