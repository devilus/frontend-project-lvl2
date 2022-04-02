import _ from 'lodash';
import { EOL } from 'os';

const Sign = {
  plus: '+',
  minus: '-',
  nil: '',
};

const makeNewEntry = (key, value, sign) => {
  const entry = `${sign} ${key}: ${value}`.trim();
  const spaces = sign === Sign.nil ? 4 : 2;
  return ' '.repeat(spaces) + entry;
};

const getObjectsDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  const diff = keys.reduce((list, key) => {
    const [value1, value2] = [_.get(obj1, key), _.get(obj2, key)];
    const newEntry = [];

    if (_.has(obj1, key) && _.has(obj2, key)) {
      value1 === value2
        ? newEntry.push(makeNewEntry(key, value1, Sign.nil))
        : newEntry.push(
            makeNewEntry(key, value1, Sign.minus),
            makeNewEntry(key, value2, Sign.plus)
          );
    } else {
      _.isNil(value1)
        ? newEntry.push(makeNewEntry(key, value2, Sign.plus))
        : newEntry.push(makeNewEntry(key, value1, Sign.minus));
    }

    return [...list, ...newEntry];
  }, []);

  return ['{', ...diff, '}'].join(EOL);
};

export { getObjectsDiff };
