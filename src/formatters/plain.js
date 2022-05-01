/* eslint-disable arrow-body-style */
import _ from 'lodash';
import { EOL } from 'os';

const simplify = (value) => {
  const newValue = _.isString(value) ? `'${value}'` : value;
  return _.isObject(newValue) ? '[complex value]' : newValue;
};

const plain = (diff) => {
  if (_.isEmpty(diff)) {
    return 'No differences';
  }

  // prettier-ignore
  const iter = (subDiff, path = []) => subDiff
    .reduce((lines, item) => {
      const { key, value, child } = item;

      if (child) {
        return [...lines, iter(child, [...path, key])];
      }

      const pathKey = [...path, key].join('.'); // Key with path
      const startLine = `Property '${pathKey}' was`;

      // Make a strings for added/removed values
      if (item.add || item.del) {
        const stateLine = item.del ? 'removed' : `added with value: ${simplify(value)}`;
        return [...lines, `${startLine} ${stateLine}`];
      }

      // Make a strings for updated values
      if (item.upd) {
        const { oldValue, newValue } = item;
        const stateLine = `updated. From ${simplify(oldValue)} to ${simplify(newValue)}`;
        return [...lines, `${startLine} ${stateLine}`];
      }

      // Skip unchanged values and just return the previous diff
      return [...lines];
    }, [])
    .join(EOL);

  return iter(diff);
};

export default plain;
