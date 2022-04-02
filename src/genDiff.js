import { getObjectsDiff } from './core/getObjectsDiff.js';
import { parseJsonFile } from './core/parseJsonFile.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseJsonFile(filepath1);
  const obj2 = parseJsonFile(filepath2);

  return getObjectsDiff(obj1, obj2);
};

export { genDiff };
