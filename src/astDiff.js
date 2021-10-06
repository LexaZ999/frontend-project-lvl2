import _ from 'lodash';
import getValue from './getValue.js';

const getAstDiff = (obj1, obj2, depth = 0, status) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = keys1.concat(keys2);
  const uniqKeys = _.sortBy(keys.filter((key, index) => keys.indexOf(key) === index));

  const result = uniqKeys.flatMap((key) => {
    const val1 = getValue(obj1, key);
    const val2 = getValue(obj2, key);

    if (typeof val1 === 'object' && typeof val2 === 'object') {
      return {
        name: key,
        value1: 'nested',
        value2: 'nested',
        depth,
        children: getAstDiff(val1, val2, depth + 1),
      };
    }

    if (typeof val1 === 'object' && typeof val2 !== 'object') {
      return {
        name: key,
        value1: 'nested',
        value2: val2,
        depth,
        status,
        children: getAstDiff(val1, {}, depth + 1, 'del'),
      };
    }

    if (_.has(obj1, key) && !_.has(obj2, key) && typeof val1 === 'object') {
      return {
        name: key,
        value1: 'nested',
        value2: undefined,
        depth,
        children: getAstDiff(val1, {}, depth + 1),
      };
    }

    if (_.has(obj2, key) && !_.has(obj1, key) && typeof val2 === 'object') {
      return {
        name: key,
        value1: undefined,
        value2: 'nested',
        depth,
        status,
        children: getAstDiff({}, val2, depth + 1, 'add'),
      };
    }

    return {
      name: key,
      value1: val1,
      value2: val2,
      depth,
      status,
    };
  });
  return result.flat();
};

export default getAstDiff;
