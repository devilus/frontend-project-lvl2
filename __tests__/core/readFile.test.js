import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readFile from '../../src/core/readFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = join(__dirname, '../..', '__fixtures__', 'file.txt');
const relativePath = join('__fixtures__', 'file.txt');
const incorrectPath = join(__dirname, '../..', '__fixtures__', 'notFound.txt');

console.log(incorrectPath);

test('readFile', () => {
  expect(readFile(absolutePath)).toBe('text');
  expect(readFile(relativePath)).toBe('text');
  expect(() => readFile(incorrectPath)).toThrow(`File ${incorrectPath} not found`);
});
