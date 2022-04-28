import { test, expect } from '@jest/globals';
import { join } from 'path';
import parseJsonFile from '../../src/parsers/parseJsonFile.js';

const jsonFile = join('__fixtures__', 'file1.json');
const incorrectFile = join('__fixtures__', 'file.txt');

const expected = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('parseJsonFile', () => {
  expect(parseJsonFile(jsonFile)).toEqual(expected);
  expect(() => parseJsonFile(incorrectFile)).toThrow(SyntaxError);
});
