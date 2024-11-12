/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { useESM: true }]
  },
  moduleNameMapper: {
    '^@/(.*).js': '<rootDir>/src/$1'
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['js', 'json', 'ts']
};
