import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import parseJsonFile from '../../../src/core/parsers/parseJsonFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = join(__dirname, '../..', '__fixtures__', 'file1.json');
const relativePath = join('__fixtures__', 'file1.json');
const incorrectPath = join(__dirname, '../..', '__fixtures__', 'notFound.json');
const incorrectFile = join(__dirname, '../..', '__fixtures__', 'file.txt');

const expected = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('parseJsonFile', () => {
  expect(parseJsonFile(absolutePath)).toEqual(expected);
  expect(parseJsonFile(relativePath)).toEqual(expected);

  expect(() => parseJsonFile(incorrectPath)).toThrow(`File ${incorrectPath} not found`);

  expect(() => parseJsonFile(incorrectFile)).toThrow(SyntaxError);
});
