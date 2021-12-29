#!/usr/bin/env node

import inquirer from 'inquirer';
import cliProgress from 'cli-progress';
import {
  validateInput,
  validateComposer,
  validateMagento
} from './src/validators.mjs';
import { composerRequire } from './src/composer-actions.mjs';
import { installFrontools } from './src/frontools-actions.mjs'

const alpacaPackagesPath = 'snowdog/module-alpaca-packages'
const frontoolsPath = 'snowdog/frontools'
const supportedMagentoVersions = ['2.4.3', '2.3.5']
const supportedFrontoolsVersions = ['1.12', '1.11']
const bar1 = new cliProgress.SingleBar({
  format: 'Progress: |' + '{bar}' + '| {percentage}% || {info}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
});

if (validateMagento()) {
  inquirer.prompt([
    {
      type: 'input',
      message: "Enter your theme name:",
      name: 'Theme Name',
      validate: validateInput
    },
    {
      type: 'list',
      message: "Pick Magento version you're using:",
      name: 'Magento version:',
      choices: supportedMagentoVersions,
      loop: true
    },
    {
      type: 'list',
      message: "Choose frontools version:",
      name: 'Frontools version:',
      choices: supportedFrontoolsVersions,
      loop: true
    }
  ])
  .then(async answers => {
    try {
      bar1.start(200, 0, {
        info: "Validating composer"
      });
      await validateComposer()

      bar1.update(20, {
        info: "Downloading Alpaca Packages"
      });
      await composerRequire(alpacaPackagesPath)

      bar1.update(100, {
        info: "Downloading Frontools"
      });
      await composerRequire(frontoolsPath)

      bar1.update(150, {
        info: "Installing frontools"
      });
      await installFrontools()

      bar1.update(200, {
        info: "Enjoy Alpaca :)"
      });
      bar1.stop();
    }
    catch (exception_var) {
      bar1.update(0, {
        info: "Installation failed, fix issues logged below and try again."
      });
      bar1.stop();
      console.log(`\n${exception_var}`)
      process.exit()
    }
    finally {
      console.log(`
        Installation finished succefuly!\n
        Visit Alpaca Docs to learn how to fully utlize Alpaca Theme.\n
        2021 | Patryk Bura | https://snow.dog
      `)
    }
  })
}