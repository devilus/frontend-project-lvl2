import parseJsonFile from './parsers/parseJsonFile.js';
import parseYamlFile from './parsers/parseYamlFile.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

export const Parsers = {
  json: parseJsonFile,
  yaml: parseYamlFile,
};

export const Formatters = {
  stylish,
  plain,
  json,
};
