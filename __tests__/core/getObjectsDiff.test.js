import { test, expect } from '@jest/globals';
import getObjectsDiff from '../../src/core/getObjectsDiff.js';

const json1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const json2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('getObjectsDiff', () => {
  expect(getObjectsDiff(json1, json2)).toBe(expected);
});
