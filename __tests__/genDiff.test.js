import { test, expect } from '@jest/globals';
import { join } from 'path';
import genDiff from '../src/genDiff.js';

const jsonFile1 = join('__fixtures__', 'file1.json');
const jsonFile2 = join('__fixtures__', 'file2.json');
const jsonFileNested1 = join('__fixtures__', 'file1_r.json');
const jsonFileNested2 = join('__fixtures__', 'file2_r.json');
const yamlFile1 = join('__fixtures__', 'file1.yaml');
const yamlFile2 = join('__fixtures__', 'file2.yml');
const incorrectFile = join('__fixtures__', 'file.txt');

const expectedPlainStylish = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const expectedNestedStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const expectedPlainPlain = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

const expectedNestedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test('genDiff', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'stylish')).toBe(expectedPlainStylish);
  expect(genDiff(jsonFileNested1, jsonFileNested2, 'stylish')).toEqual(expectedNestedStylish);
  expect(genDiff(jsonFile1, jsonFile2, 'plain')).toBe(expectedPlainPlain);
  expect(genDiff(jsonFileNested1, jsonFileNested2, 'plain')).toEqual(expectedNestedPlain);
  expect(genDiff(jsonFile1, yamlFile1)).toBe('No differences');
  expect(genDiff(jsonFile1, yamlFile2)).toBe(expectedPlainStylish);
  expect(() => genDiff(yamlFile1, incorrectFile)).toThrow();
});
