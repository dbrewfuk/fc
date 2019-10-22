const path = require('path');
const postcssConfig = {
  indent: 'postcss',
  plugins: [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-cssnext'),
    require('postcss-inline-svg')({
      paths: [path.resolve(__dirname, 'img')],
    }),
    require('tailwindcss'),
  ],
};

if (process.env.NODE_ENV === 'production') {
  postcssConfig.plugins.push(
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }]
    })
  );
}

module.exports = postcssConfig;
