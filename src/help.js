import { Command } from 'commander/esm.mjs';
import gendiff from '../index.js';

const cli = () => {
  const program = new Command();

  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const format = `${program.opts().format}`;
      console.log(gendiff(filepath1, filepath2, format));
      console.log(format);
    })
    .parse(process.argv);
};

export default cli;
