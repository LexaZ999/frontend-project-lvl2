import path from 'path';
import yaml from 'js-yaml';
import readFile from './readFile.js';

const parsers = (filepath) => {
  const data = readFile(filepath);
  const format = path.extname(filepath);

  if (format === '.json') return JSON.parse(data);
  if (format === '.yaml') return yaml.load(data);
  if (format === '.yml') return yaml.load(data);

  throw new Error(`unknown file type: '${format}'!`);
};

export default parsers;
