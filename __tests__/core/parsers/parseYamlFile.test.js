import { test, expect } from '@jest/globals';
import { join } from 'path';
import parseYamlFile from '../../../src/core/parsers/parseYamlFile.js';

const yamlFile = join('__fixtures__', 'file1.yaml');

const expected = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('parseYamlFile', () => {
  expect(parseYamlFile(yamlFile)).toEqual(expected);
});
