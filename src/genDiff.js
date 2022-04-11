import _ from 'lodash';
import getFileType from './core/getFileType.js';
import getObjectsDiff from './core/getObjectsDiff.js';
import parseJsonFile from './core/parsers/parseJsonFile.js';
import parseYamlFile from './core/parsers/parseYamlFile.js';

const parsers = {
  json: parseJsonFile,
  yaml: parseYamlFile,
};

const parse = (filepath) => {
  const fileType = getFileType(filepath);
  const runParser = parsers[fileType];

  if (!_.isFunction(runParser)) {
    throw new Error(`Unable to find parser for "${fileType}" file type`);
  }

  return runParser(filepath);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  return getObjectsDiff(obj1, obj2);
};

export default genDiff;
