module.exports = function ({
   addUtilities,
   variants
 }) {
  addUtilities({
    '.block': {
      display: 'block'
    },
    '.inline-block': {
      display: 'inline-block'
    },
    '.inline': {
      display: 'inline'
    },
    '.flex': {
      display: 'flex'
    },
    '.inline-flex': {
      display: 'inline-flex'
    },
    '.hidden': {
      display: 'none'
    }
  }, variants('display'));
};
