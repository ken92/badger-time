const colors = require('colors');

const textColors = {
  red: { color: colors.red, label: 'r' },
  green: { color: colors.green, label: 'g' },
  yellow: { color: colors.yellow, label: 'y' },
  blue: { color: colors.blue, label: 'b' },
  magenta: { color: colors.magenta, label: 'm' },
  cyan: { color: colors.cyan, label: 'c' },
  white: { color: colors.white, label: 'w' }
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

module.exports = {
  textColors,
  backgroundColors
};
