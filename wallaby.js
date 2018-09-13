module.exports = function () {

  return {
    files: [
      'tsconfig.json',
      'src/**/*.ts',
      '!src/**/*.test.ts',
      '!src/**/__tests__/*.ts'
    ],

    tests: [
      'src/**/*.test.ts',
      'src/**/__tests__/*.ts'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest'
  };
};
