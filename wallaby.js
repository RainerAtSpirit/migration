module.exports = function () {

  return {
    files: [
      'src/setupEnzyme.ts',
      'empty-module.js',
      'tsconfig.json',
      'src/**/*.less',
      'src/**/*.ts?(x)',
      '!src/**/*.test.ts?(x)',
      '!src/**/__tests__/*.ts?(x)',
      { pattern: 'tsconfig.*', instrument: false },
      { pattern: 'package.json', instrument: false },
      { pattern: 'src/setupEnzyme.ts', instrument: false }
    ],

    tests: [
      'src/**/*.test.ts?(x)',
      'src/**/__tests__/*.ts?(x)'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: "jest",

    setup: function (wallaby) {
      var jestConfig = require('./package.json').jest;
      // delete jestConfig.transform; // <--
      wallaby.testFramework.configure(jestConfig);
    },


    preprocessors: {
      "**/*.js?(x)": file =>
        require("babel-core").transform(file.content, {
          sourceMap: true,
          filename: file.path,
          compact: false,
          babelrc: true,
          presets: ["babel-preset-jest"],
          plugins: ["transform-es2015-modules-commonjs"]
        })
    }
  }
}
