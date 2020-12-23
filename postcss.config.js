module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-size'),
    require('postcss-preset-env')({
      stage: 0, // 0: polyfill all, 4: polyfill none, but polyfill the following features: { 'nesting-rules': true}
      features: {
        'nesting-rules': true
      }
    })
  ]
};
