import { Command } from 'commander/esm.mjs';

const cli = () => {
  const program = new Command();

  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .parse(process.argv);
};

export default cli;