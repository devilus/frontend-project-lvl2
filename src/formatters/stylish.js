import _ from 'lodash';
import { EOL } from 'os';

const convertDiff = (diff) =>
  diff.reduce((convertedDiff, item) => {
    let state = ' ';
    if (item.del || item.add) {
      state = item.del ? '-' : '+';
    }

    // Key with state
    const newKey = [state, item.key].join(' ');

    // Recursive convert the object of value to add a state to every key (for easier alignment)
    if (_.isObject(item.value)) {
      const subValue = _.entries(item.value).map(([key, value]) => ({ key, value }));
      return { ...convertedDiff, [newKey]: convertDiff(subValue) };
    }

    return { ...convertedDiff, [newKey]: item.child ? convertDiff(item.child) : item.value };
  }, {});

const stylish = (diff, replacer = ' ', spacesCount = 2) => {
  if (_.isEmpty(diff)) {
    return 'No differences';
  }

  const iter = (currentValue, indentsCount) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    // Indents
    const indents = replacer.repeat(indentsCount);
    const bracketIndent = replacer.repeat(indentsCount - spacesCount);

    // Recursive make a prepared lines
    const lines = _.entries(currentValue).map(([key, value]) => {
      const nextIndetsCount = indentsCount + spacesCount * 2;
      return `${indents}${key}: ${iter(value, nextIndetsCount)}`;
    });

    return ['{', ...lines, `${bracketIndent}}`].join(EOL);
  };

  return iter(convertDiff(diff), spacesCount);
};

export default stylish;
