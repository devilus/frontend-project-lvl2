import { test, expect } from '@jest/globals';
import { join } from 'path';
import getFileType from '../../src/core/getFileType';

test('getFileType', () => {
  expect(getFileType(join('__fixtures__', 'file1.json'))).toBe('json');
  expect(getFileType(join('__fixtures__', 'file1.yaml'))).toBe('yaml');
  expect(getFileType(join('__fixtures__', 'file2.yml'))).toBe('yaml');
  expect(getFileType(join('__fixtures__', 'file'))).toBeNull();
});
