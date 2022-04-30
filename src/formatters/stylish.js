import _ from 'lodash';
import { EOL } from 'os';

const getState = (item) => {
  const preSign = {
    add: '+',
    del: '-',
  };

  const state = _(preSign)
    .keys()
    .filter((key) => _.has(item, key))
    .first();

  return preSign[state] ?? ' ';
};

const convertDiff = (diff) =>
  diff
    .flatMap((item) => {
      if (item.upd) {
        // Expand updated values
        const { key, oldValue, newValue } = item;
        return [
          { key, value: oldValue, del: true },
          { key, value: newValue, add: true },
        ];
      }

      return item;
    })
    .reduce((convertedDiff, item) => {
      const { key, value, child } = item;
      const state = getState(item);

      // Key with state
      const newKey = [state, key].join(' ');

      // Recursive convert the object of value to add a state to every key (for easier alignment)
      if (_.isObject(value)) {
        const subValue = _.entries(value).map(([objKey, objVal]) => ({
          key: objKey,
          value: objVal,
        }));
        return { ...convertedDiff, [newKey]: convertDiff(subValue) };
      }

      return { ...convertedDiff, [newKey]: child ? convertDiff(child) : value };
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
