import program from 'commander';
import pkg from '../package';
import handleConfigFile from './commands/handleConfigFile';
import handleSaveFlag from './commands/handleSaveFlag';
import handleUserInput from './commands/handleUserInput';
import addSelectedCircleCiSteps from './commands/addSelectedCircleCiSteps';

program
  .version(pkg.version)
  .usage('[options]')
  .option('-f, --file [path]', 'config file')
  .option('-i --init', 'initialize project with circleci config file')
  .option('-s, --save [path]', 'save output file')
  .parse(process.argv);

console.log('You are enhancing your circleci pipeline');

const circleCiTools = async ({ file, init, save }) => {
  const config = await handleConfigFile(file, init);
  const answers = await handleUserInput(config);
  await addSelectedCircleCiSteps(answers, config);
  await handleSaveFlag(save, init, config);
};

circleCiTools(program).then(
  () => {
    console.log('Success');
  },
  (err) => {
    console.error(err);
    console.error('Something went wrong');
  },
);
