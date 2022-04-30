import _ from 'lodash';

const getObjectsDiff = (obj1, obj2) => {
  if (_.isEqual(obj1, obj2)) {
    return [];
  }

  const keys = _([_.keys(obj1), _.keys(obj2)])
    .flatten()
    .union()
    .sort()
    .value();

  return keys.flatMap((key) => {
    const [oldValue, newValue] = [_.get(obj1, key), _.get(obj2, key)];

    // Recursive diff
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        key,
        child: getObjectsDiff(oldValue, newValue),
      };
    }

    // Unchanged values
    if (oldValue === newValue) {
      return {
        key,
        value: oldValue,
      };
    }

    // Changed values
    if (!_.isUndefined(oldValue) && !_.isUndefined(newValue)) {
      return {
        key,
        oldValue,
        newValue,
        upd: true,
      };
    }

    // Removed or added values
    const state = _.isUndefined(newValue) ? { del: true } : { add: true };
    return {
      key,
      value: oldValue ?? newValue,
      ...state,
    };
  });
};

export default getObjectsDiff;
