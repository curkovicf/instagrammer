/* eslint-disable */
export default {
  displayName: 'api-module-auth-shared-decorator',
  preset: '../../../../../../jest.preset.js',
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../../../coverage/libs/api/module/auth/shared/decorator',
};
