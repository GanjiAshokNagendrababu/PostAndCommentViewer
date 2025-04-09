module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-redux' + // 👈 explicitly include ESM modules
      '|@react-navigation' +
      ')/)',
  ],
  // setupFiles: ['<rootDir>/jest/setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

