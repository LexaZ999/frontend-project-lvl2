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

    const createDiffCell = (value1, value2, leafPath, status, children) => {
      const diffCell = {
        key, value1, value2, leafPath, depth, status, substatus, children,
      };
      return diffCell;
    };

    const pathAndSeparator = (path === '') ? path : (path + point);

    if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null) {
      return createDiffCell('nested', 'nested', pathAndSeparator + key, 'nested', getAstDiff(val1, val2, pathAndSeparator + key, depth + 1));
    }
    if (typeof val1 === 'object' && typeof val2 !== 'object' && val1 !== null) {
      const currentStatusNested = val2 ? 'nested changed to value' : 'deleted nested';
      return createDiffCell('nested', val2, pathAndSeparator + key, currentStatusNested, getAstDiff(val1, {}, pathAndSeparator + key, depth + 1, 'del'));
    }
    if (!_.has(obj1, key) && _.has(obj2, key) && typeof val2 === 'object' && val2 !== null) {
      return createDiffCell(val1, 'nested', pathAndSeparator + key, 'added nested', getAstDiff({}, val2, pathAndSeparator + key, depth + 1, 'add'));
    }
    if ((val1 === undefined) || (val2 === undefined)) {
      const statusAddOrDel = (val1 === undefined) ? 'add' : 'del';
      return createDiffCell(val1, val2, pathAndSeparator + key, statusAddOrDel);
    }
    const statusUnchangedOrChanged = (val1 === val2) ? 'unchanged' : 'changed';
    return createDiffCell(val1, val2, pathAndSeparator + key, statusUnchangedOrChanged);
  });
  return result.flat();
};
export default getAstDiff;
