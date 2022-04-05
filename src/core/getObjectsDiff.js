import _ from 'lodash';
import { EOL } from 'os';

const MathSign = {
  plus: '+',
  minus: '-',
};

const makeNewEntry = (key, value, sign = '') => {
  const indent = { big: 4, small: 2 };
  const spacesCount = _.isEmpty(sign) ? indent.big : indent.small;
  const entry = `${sign} ${key}: ${value}`.trim();

  return ' '.repeat(spacesCount) + entry;
};

const getObjectsDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  const diff = keys.flatMap((key) => {
    const [value1, value2] = [_.get(obj1, key), _.get(obj2, key)];

    if (_.has(obj1, key) && _.has(obj2, key)) {
      return value1 === value2
        ? makeNewEntry(key, value1)
        : [makeNewEntry(key, value1, MathSign.minus), makeNewEntry(key, value2, MathSign.plus)];
    }

    // eslint-disable-next-line max-len
    return _.isNil(value1) ? makeNewEntry(key, value2, MathSign.plus) : makeNewEntry(key, value1, MathSign.minus);
  });

  return ['{', ...diff, '}'].join(EOL);
};

export default getObjectsDiff;
