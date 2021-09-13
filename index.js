import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const gendiff = (filepath1, filepath2) => {
  const sourceFile1 = readFileSync(path.resolve('src/', filepath1), 'utf8');
  const sourceFile2 = readFileSync(path.resolve('src/', filepath2), 'utf8');

  const objSourceFile1 = JSON.parse(sourceFile1);
  const keys1 = Object.keys(objSourceFile1);
  const objSourceFile2 = JSON.parse(sourceFile2);
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
