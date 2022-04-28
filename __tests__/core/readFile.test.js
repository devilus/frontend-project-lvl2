import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readFile from '../../src/core/readFile.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const absolutePath = join(__dirname, '../..', '__fixtures__', 'file.txt');
const relativePath = join('__fixtures__', 'file.txt');
const incorrectPath = join(__dirname, '../..', '__fixtures__', 'notFound.txt');

test('readFile', () => {
  expect(readFile(absolutePath)).toBe('text');
  expect(readFile(relativePath)).toBe('text');
  expect(() => readFile(incorrectPath)).toThrow(`File ${incorrectPath} not found`);
});
