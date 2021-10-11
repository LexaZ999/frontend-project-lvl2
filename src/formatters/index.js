import stylish from './stylish.js';
import plain from './plain.js';

const selectsFormatter = (formatName, ast) => {
  const result = (formatName === 'plain') ? plain(ast) : stylish(ast);
  return result;
};
export default selectsFormatter;
