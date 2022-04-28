import { test, expect } from '@jest/globals';
import { join } from 'path';
import { readFileSync } from 'fs';
import getObjectsDiff from '../../src/core/getObjectsDiff.js';

const json1 = JSON.parse(readFileSync(join('__fixtures__', 'file1.json')));
const json2 = JSON.parse(readFileSync(join('__fixtures__', 'file2.json')));
const jsonNested1 = JSON.parse(readFileSync(join('__fixtures__', 'file1_r.json')));
const jsonNested2 = JSON.parse(readFileSync(join('__fixtures__', 'file2_r.json')));

const expectedPlain = [
  {
    key: 'follow',
    value: false,
    del: true,
  },
  {
    key: 'host',
    value: 'hexlet.io',
  },
  {
    key: 'proxy',
    value: '123.234.53.22',
    del: true,
  },
  {
    key: 'timeout',
    value: 50,
    del: true,
  },
  {
    key: 'timeout',
    value: 20,
    add: true,
  },
  {
    key: 'verbose',
    value: true,
    add: true,
  },
];

const expectedNested = [
  {
    key: 'common',
    child: [
      {
        key: 'follow',
        value: false,
        add: true,
      },
      {
        key: 'setting1',
        value: 'Value 1',
      },
      {
        key: 'setting2',
        value: 200,
        del: true,
      },
      {
        key: 'setting3',
        value: true,
        del: true,
      },
      {
        key: 'setting3',
        value: null,
        add: true,
      },
      {
        key: 'setting4',
        value: 'blah blah',
        add: true,
      },
      {
        key: 'setting5',
        value: {
          key5: 'value5',
        },
        add: true,
      },
      {
        key: 'setting6',
        child: [
          {
            key: 'doge',
            child: [
              {
                key: 'wow',
                value: '',
                del: true,
              },
              {
                key: 'wow',
                value: 'so much',
                add: true,
              },
            ],
          },
          {
            key: 'key',
            value: 'value',
          },
          {
            key: 'ops',
            value: 'vops',
            add: true,
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    child: [
      {
        key: 'baz',
        value: 'bas',
        del: true,
      },
      {
        key: 'baz',
        value: 'bars',
        add: true,
      },
      {
        key: 'foo',
        value: 'bar',
      },
      {
        key: 'nest',
        value: {
          key: 'value',
        },
        del: true,
      },
      {
        key: 'nest',
        value: 'str',
        add: true,
      },
    ],
  },
  {
    key: 'group2',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
    del: true,
  },
  {
    key: 'group3',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
    add: true,
  },
];

test('getObjectsDiff', () => {
  expect(getObjectsDiff(json1, json2)).toEqual(expectedPlain);
  expect(getObjectsDiff(jsonNested1, jsonNested2)).toEqual(expectedNested);
});
