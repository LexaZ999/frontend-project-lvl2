import parsers from './src/parsers.js';
import getAstDiff from './src/astDiff.js';
import stylish from './src/stylish.js';

const gendiff = (filepath1, filepath2) => {
  const objSourceFile1 = parsers(filepath1);
  const objSourceFile2 = parsers(filepath2);
  const ast = getAstDiff(objSourceFile1, objSourceFile2);
  return stylish(ast);
};

export default gendiff;
