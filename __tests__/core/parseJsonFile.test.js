import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { parseJsonFile } from '../../src/core/parseJsonFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const correctPath = join(__dirname, '../..', '__fixtures__', 'file1.json');
const incorrectPath = join(__dirname, '../..', '__fixtures__', 'notFound.json');
const incorrectFile = join(__dirname, '../..', '__fixtures__', 'file.txt');

const expected = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('parseJsonFile', () => {
  expect(parseJsonFile(correctPath)).toEqual(expected);

  expect(() => parseJsonFile(incorrectPath)).toThrow(
    `File ${incorrectPath} not found`
  );

  expect(() => parseJsonFile(incorrectFile)).toThrow(SyntaxError);
});
