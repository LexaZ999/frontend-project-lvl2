import _ from 'lodash';
import parsers from './src/parsers.js';

const gendiff = (filepath1, filepath2) => {
  const objSourceFile1 = parsers(filepath1);
  const objSourceFile2 = parsers(filepath2);
  const keys1 = Object.keys(objSourceFile1);
  const keys2 = Object.keys(objSourceFile2);

  const keys = keys1.concat(keys2);
  const uniqKeys = _.sortBy(keys.filter((key, index) => keys.indexOf(key) === index));

  const result = uniqKeys.flatMap((key) => {
    if (_.has(objSourceFile1, key) && _.has(objSourceFile2, key)) {
      if (objSourceFile1[key] !== objSourceFile2[key]) {
        return [`- ${key}: ${objSourceFile1[key]}`, `+ ${key}: ${objSourceFile2[key]}`];
      }
      return `  ${key}: ${objSourceFile1[key]}`;
    }
    if (_.has(objSourceFile1, key) && !_.has(objSourceFile2, key)) {
      return `- ${key}: ${objSourceFile1[key]}`;
    }
    return `+ ${key}: ${objSourceFile2[key]}`;
  });

  return `{\n ${result.join('\n ')}\n}`;
};

export default gendiff;

// console.log(gendiff('file1.json', 'file2.json'));
