import _ from 'lodash';
import { Parsers, Formatters } from './bundles.js';
import getFileType from './core/getFileType.js';
import getObjectsDiff from './core/getObjectsDiff.js';

const parse = (filepath) => {
  const fileType = getFileType(filepath);
  const runParser = Parsers[fileType];

  if (!_.isFunction(runParser)) {
    throw new Error(`Unable to find parser for "${fileType}" file type`);
  }

  return runParser(filepath);
};

const format = (diff, type) => {
  const runFormatter = Formatters[type];

  if (!_.isFunction(runFormatter)) {
    throw new Error(`Unable to find formatter "${type}"`);
  }

  return runFormatter(diff);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const [obj1, obj2] = [parse(filepath1), parse(filepath2)];
  const diff = getObjectsDiff(obj1, obj2);

  return format(diff, formatter);
};

export default genDiff;
