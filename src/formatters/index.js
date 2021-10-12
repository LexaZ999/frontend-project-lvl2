import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './jsonFormatter.js';

const selectsFormatter = (formatName, ast) => {
  if (formatName === 'plain') return plain(ast);
  if ((formatName === 'json')) return jsonFormatter(ast);
  return stylish(ast);
};
export default selectsFormatter;
