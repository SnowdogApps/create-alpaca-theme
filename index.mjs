#!/usr/bin/env node
import fs, { readFileSync } from 'fs'
import path from 'path';
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
import { installFrontools, compileFiles } from './src/frontools-actions.mjs'
import {
  replaceJSONContents,
  renameTheme,
  renameBrowserSyncPaths,
  createDirectory,
  createThmeRegistrationFiles
} from './src/local-env-actions.mjs'
import { magentoUpgrade } from './src/magento-actions.mjs'

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

      progressBar.update(2, {
        info: "Downloading Alpaca Packages"
      });
      // await composerRequire(alpacaPackagesPath)

      progressBar.update(30, {
        info: "Downloading Frontools"
      });
      // await composerRequire(frontoolsPath)

      progressBar.update(45, {
        info: "Installing frontools"
      });
      // await installFrontools()

      progressBar.update(55, {
        info: "Configuring themes.json"
      });
      const themesJson = JSON.parse(await readFile(new URL('./templates/themes.json', import.meta.url)));
      await replaceJSONContents('dev/tools/frontools/config/themes.json', themesJson)

      progressBar.update(57, {
        info: "Replace theme name in themes.json with your theme name"
      });
      await renameTheme('dev/tools/frontools/config/themes.json', answers.name)

      progressBar.update(59, {
        info: "Configuring browser-sync.json"
      });
      const browserSyncJson = JSON.parse(await readFile(new URL('./templates/browser-sync.json', import.meta.url)));
      await replaceJSONContents('dev/tools/frontools/config/browser-sync.json', browserSyncJson)

      progressBar.update(61, {
        info: "Replace theme name in browser-sync.json with your theme name"
      });
      await renameBrowserSyncPaths('dev/tools/frontools/config/browser-sync.json', answers.name)

      progressBar.update(63, {
        info: "Creating child theme directory."
      });
      await createDirectory(`app/design/frontend/${answers.name}`)

      progressBar.update(65, {
        info: "Creating theme.xml file"
      });
      const themeXML = await readFile(new URL('./templates/theme.xml', import.meta.url));
      const themeXMLUpdated = themeXML.toString().replace(/YOUR_THEME_NAME/gim, answers.name)
      createThmeRegistrationFiles(`app/design/frontend/${answers.name}/theme.xml`, themeXMLUpdated)

      progressBar.update(67, {
        info: "Creating registration.php file"
      });
      const registrationPhp = await readFile(new URL('./templates/registration.php', import.meta.url));
      const registrationPHPupdated = registrationPhp.toString().replace(/YOUR_THEME_NAME/gim, answers.name)
      createThmeRegistrationFiles(`app/design/frontend/${answers.name}/registration.php`, registrationPHPupdated)

      progressBar.update(70, {
        info: "Upgrading magneto instance."
      });
      await magentoUpgrade()
  
      progressBar.update(90, {
        info: "Compiling files."
      });
      await compileFiles()

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
        Visit Alpaca Docs to learn how to fully utlize Alpaca Theme.\n
        2021 | Patryk Bura | https://snow.dog
      `)
    }
  })
}