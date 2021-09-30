import path from 'path';
import yaml from 'js-yaml';
import readFile from './readFile.js';

const parsers = (filepath) => {
  const data = readFile(filepath);
  const format = path.extname(filepath);

  let parse;

  if (format === '.json') parse = JSON.parse;
  if (format === '.yaml') parse = yaml.load;
  if (format === '.yml') parse = yaml.load;

  return parse(data);
};

export default parsers;
