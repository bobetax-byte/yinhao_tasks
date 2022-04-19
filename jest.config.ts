export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  "rootDir": "./src",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/mock-test/fileMock.js',
  }
}