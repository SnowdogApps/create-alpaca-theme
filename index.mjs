#!/usr/bin/env node

import fs from 'fs'
import inquirer from 'inquirer';
import cliProgress from 'cli-progress';
import _colors from 'colors'
import { readFile } from 'fs/promises';
import {
  validateInput,
  validateComposer,
  validateMagento
} from './src/validators.mjs';
import { composerRequire } from './src/composer-actions.mjs';
import { installFrontools } from './src/frontools-actions.mjs'
import { replaceContents } from './src/localEnv-actions.mjs'

const alpacaPackagesPath = 'snowdog/module-alpaca-packages'
const frontoolsPath = 'snowdog/frontools'
const themesJson = JSON.parse(await readFile(new URL('./templates/themes.json', import.meta.url)));
const progressBar = new cliProgress.SingleBar({
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
      progressBar.start(200, 0, {
        info: "Validating composer"
      });
      await validateComposer()

      progressBar.update(20, {
        info: "Downloading Alpaca Packages"
      });
      // await composerRequire(alpacaPackagesPath)

      progressBar.update(100, {
        info: "Downloading Frontools"
      });
      // await composerRequire(frontoolsPath)

      progressBar.update(150, {
        info: "Installing frontools"
      });
      // await installFrontools()

      progressBar.update(160, {
        info: "Configuring themes.json"
      });
      await replaceContents('dev/tools/frontools/config/themes.json', themesJson)
      // setup themes.json
      // setup browsersync.json
      // create directory in app/design/frontend
      // create registraion.php
      // create theme.xml
      // bin/magento setup:upgrade
      // run yarn install && yarn setup && yarn styles && yarn svg && yarn babel
      // Go to Content -> Design -> Configuration, and choose your theme

      progressBar.update(200, {
        info: "Enjoy Alpaca :)"
      });
      progressBar.stop();
    }
    catch (exception_var) {
      progressBar.update(0, {
        info: "Installation failed, fix issues logged below and try again."
      });
      progressBar.stop();
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