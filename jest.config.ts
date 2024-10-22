import type { Config } from 'jest';

const config: Config = {
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};

export default config;
