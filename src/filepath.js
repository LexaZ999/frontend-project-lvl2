import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);

export default getPath;
