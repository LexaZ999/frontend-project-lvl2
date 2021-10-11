import _ from 'lodash';
import getValue from './getValue.js';

const getAstDiff = (obj1, obj2, path = '', depth = 0, substatus) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = keys1.concat(keys2);
  const uniqKeys = _.sortBy(keys.filter((key, index) => keys.indexOf(key) === index));
  const result = uniqKeys.flatMap((key) => {
    const val1 = getValue(obj1, key);
    const val2 = getValue(obj2, key);
    const point = '.';
    let status;

    const createDiffCell = (value1, value2, children) => {
      const diffCell = {
        key, value1, value2, path, depth, status, substatus, children,
      };
      return diffCell;
    };

    const pathAndSeparator = (path === '') ? path : (path + point);

    if (typeof val1 === 'object' && typeof val2 === 'object') {
      status = 'nested';
      return createDiffCell('nested', 'nested', getAstDiff(val1, val2, pathAndSeparator + key, depth + 1));
    }
    if (typeof val1 === 'object' && typeof val2 !== 'object') {
      status = val2 ? 'nested changed to value' : 'deleted nested';
      return createDiffCell('nested', val2, getAstDiff(val1, {}, pathAndSeparator + key, depth + 1, 'del'));
    }
    if (!_.has(obj1, key) && _.has(obj2, key) && typeof val2 === 'object') {
      status = 'added nested';
      return createDiffCell(val1, 'nested', getAstDiff({}, val2, pathAndSeparator + key, depth + 1, 'add'));
    }
    if ((val1 === undefined) || (val2 === undefined)) {
      status = (val1 === undefined) ? 'add' : 'del';
      return createDiffCell(val1, val2);
    }
    status = (val1 === val2) ? 'unchanged' : 'changed';
    return createDiffCell(val1, val2);
  });
  return result.flat();
};
export default getAstDiff;
