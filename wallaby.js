module.exports = function () {

  return {
    files: [
      'tsconfig.json',
      'src/**/*.ts',
      '!src/**/*.test.ts',
      '!src/**/__tests__/*.ts',
      { pattern: 'tsconfig.*', instrument: false },
      { pattern: 'package.json', instrument: false }
    ],

    tests: [
      'src/**/*.test.ts',
      'src/**/__tests__/*.ts'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: "jest",

    setup: function (wallaby) {
      var jestConfig = require('./package.json').jest;
      delete jestConfig.transform; // <--
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
