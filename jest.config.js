/** @type {import('ts-jest').JestConfigWithTsJest} **/

import { createDefaultEsmPreset } from 'ts-jest';

export default {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*).js': '<rootDir>/src/$1'
  },
  setupFiles: ['<rootDir>/src/__tests__/setupFile.ts'],
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  ...createDefaultEsmPreset()
};
