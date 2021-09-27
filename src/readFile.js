import { readFileSync } from 'fs';
import getPath from './filepath.js';

const readFile = (filepath) => readFileSync(getPath(filepath), 'utf-8');

export default readFile;
