#!/usr/bin/env node
import fs from 'fs'
import inquirer from 'inquirer';
import cliProgress from 'cli-progress';
import _colors from 'colors'
import { readFile } from 'fs/promises';
import convert from 'xml-js';
import {
  validateInput,
  validateComposer,
  validateMagento
} from './src/validators.mjs';
import { composerRequire } from './src/composer-actions.mjs';
import { installFrontools } from './src/frontools-actions.mjs'
import {
  replaceJSONContents,
  renameTheme,
  renameBrowserSyncPaths,
  createDirectory
} from './src/local-env-actions.mjs'

const alpacaPackagesPath = 'snowdog/module-alpaca-packages'
const frontoolsPath = 'snowdog/frontools'
const progressBar = new cliProgress.SingleBar({
  format: 'Progress: |' + _colors.cyan('{bar}') + '| {percentage}% || {info}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
});

// Check if current directory is valid Magento instance
if (validateMagento()) {
  inquirer.prompt([
    {
      type: 'input',
      message: "Enter your theme name:",
      name: 'name',
      validate: validateInput
    }
  ])
  .then(async answers => {
    try {
      progressBar.start(100, 0, {
        info: "Validating composer"
      });
      await validateComposer()

      progressBar.update(5, {
        info: "Downloading Alpaca Packages"
      });
      // await composerRequire(alpacaPackagesPath)

      progressBar.update(45, {
        info: "Downloading Frontools"
      });
      // await composerRequire(frontoolsPath)

      progressBar.update(60, {
        info: "Installing frontools"
      });
      // await installFrontools()

      progressBar.update(70, {
        info: "Configuring themes.json"
      });
      const themesJson = JSON.parse(await readFile(new URL('./templates/themes.json', import.meta.url)));
      await replaceJSONContents('dev/tools/frontools/config/themes.json', themesJson)

      progressBar.update(75, {
        info: "Replace theme name in themes.json with your theme name"
      });
      await renameTheme('dev/tools/frontools/config/themes.json', answers.name)

      progressBar.update(80, {
        info: "Configuring browser-sync.json"
      });
      const browserSyncJson = JSON.parse(await readFile(new URL('./templates/browser-sync.json', import.meta.url)));
      await replaceJSONContents('dev/tools/frontools/config/browser-sync.json', browserSyncJson)

      progressBar.update(85, {
        info: "Replace theme name in browser-sync.json with your theme name"
      });
      await renameBrowserSyncPaths('dev/tools/frontools/config/browser-sync.json', answers.name)

      await createDirectory(`app/design/frontend/${answers.name}`)

      // fs.writeFileSync(path, JSON.stringify(json), err => {
      //   if (err) {
      //     console.log(err);
      //   }
    
      //   console.log('done');
      // });
      // console.log(fs.readFileSync('./templates/theme.xml', {encoding: 'utf-8'})); 
      // create registraion.php
      // create theme.xml
      // bin/magento setup:upgrade
      // run yarn install && yarn setup && yarn styles && yarn svg && yarn babel
      // Go to Content -> Design -> Configuration, and choose your theme

      progressBar.update(100, {
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