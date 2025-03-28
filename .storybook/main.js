module.exports = {
  stories: ['../stories/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  docs: {
    autodocs: true
  }
};
