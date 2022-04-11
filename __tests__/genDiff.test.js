import { test, expect } from '@jest/globals';
import { join } from 'path';
import { EOL } from 'os';
import genDiff from '../src/genDiff.js';

const jsonfile1 = join('__fixtures__', 'file1.json');
const jsonfile2 = join('__fixtures__', 'file2.json');
const yamlFile1 = join('__fixtures__', 'file1.yaml');
const yamlFile2 = join('__fixtures__', 'file2.yml');
const incorrectFile = join('__fixtures__', 'file.txt');

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff ', () => {
  expect(genDiff(jsonfile1, jsonfile2)).toBe(expected);
  expect(genDiff(jsonfile1, yamlFile1)).toBe(['{', '}'].join(EOL));
  expect(genDiff(jsonfile1, yamlFile2)).toBe(expected);
  expect(() => genDiff(yamlFile1, incorrectFile)).toThrow();
});
