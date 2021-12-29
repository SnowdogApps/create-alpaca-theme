#!/usr/bin/env node

import inquirer from 'inquirer';
import cliProgress from 'cli-progress';
import _colors from 'colors'
import {
  validateInput,
  validateComposer,
  validateMagento
} from './src/validators.mjs';
import { composerRequire } from './src/composer-actions.mjs';
import { installFrontools } from './src/frontools-actions.mjs'

const alpacaPackagesPath = 'snowdog/module-alpaca-packages'
const frontoolsPath = 'snowdog/frontools'
const supportedFrontoolsVersions = ['1.12', '1.11']
const bar1 = new cliProgress.SingleBar({
  format: 'Progress: |' + _colors.cyan('{bar}') + '| {percentage}% || {info}',
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

      // setup themes.json
      // setup browsersync.json
      // create directory in app/design/frontend
      // create registraion.php
      // create theme.xml
      // bin/magento setup:upgrade
      // run yarn install && yarn setup && yarn styles && yarn svg && yarn babel
      // Go to Content -> Design -> Configuration, and choose your theme

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