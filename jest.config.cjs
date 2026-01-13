/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  extensionsToTreatAsEsm: ['.ts'],
  collectCoverageFrom: [
    'src/services/authService.ts',
    'src/services/userService.ts',
    'src/services/storyService.ts',
    'src/controllers/authController.ts',
    'src/controllers/userController.ts',
    'src/controllers/storyController.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.ts$': '$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@openrouter/sdk$': '<rootDir>/src/__tests__/mocks/openrouterSdk.ts',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          module: 'ESNext',
          moduleResolution: 'node',
        },
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(@openrouter)/)'],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  verbose: true,
};
