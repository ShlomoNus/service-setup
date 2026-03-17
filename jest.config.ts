import { createDefaultPreset } from 'ts-jest';
import type { Config } from 'jest';

const config: Config = {
  ...createDefaultPreset(),
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  clearMocks: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;