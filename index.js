import parsers from './src/parsers.js';
import getAstDiff from './src/astDiff.js';
import selectsFormatter from './src/formatters/index.js';

const gendiff = (filepath1, filepath2, formatName) => {
  const objSourceFile1 = parsers(filepath1);
  const objSourceFile2 = parsers(filepath2);
  const ast = getAstDiff(objSourceFile1, objSourceFile2);
  return selectsFormatter(formatName, ast);
};
export default gendiff;
