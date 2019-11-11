module.exports = {
  theme: {
    colors: require('./src/tailwind/colors'),

    screens: {
      sm: '32em',
      md: '48em',
      lg: '64em',
      xl: '80em',
    },

    spacing: {
      sm: '32em',
      md: '48em',
      lg: '64em',
      xl: '80em',
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '52': '14rem',
      '56': '16rem',
      '60': '18rem',
      '64': '20rem',
      '68': '22rem',
    },

    extend: {
      margin: {
        '-49': '-13.5rem',
      },
      maxHeight: {
        '48': '12rem',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
      },
    }
  },

  variants: {
    backgroundColor: ['hover', 'focus'],
    borderColor: ['hover', 'focus'],
    borderRadius: [],
    borderStyle: ['group-hover'],
    borderWidth: [],
    boxShadow: ['hover', 'focus'],
    fontSmoothing: [],
    fontWeight: ['hover', 'focus'],
    opacity: ['hover'],
    outline: ['focus'],
    overflow: [],
    stroke: [],
    textColor: ['hover', 'focus'],
    textDecoration: ['hover', 'focus'],
    textTransform: [],
    zIndex: [],
  },

  plugins: [
    require('./src/tailwind/plugins/display'),
  ],

  corePlugins: {
    preflight: false,
    container: false,
    display: false,
    float: false,
    fontFamily: false,
    objectFit: false,
    objectPosition: false,
    pointerEvents: false,
    userSelect: false,
    whitespace: false,
  },
};
