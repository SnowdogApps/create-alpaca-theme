#!/usr/bin/env node

import inquirer from 'inquirer';
import cliProgress from 'cli-progress';
import _colors from 'colors'
import { readFile } from 'fs/promises';
import {
  validateInput,
  validateComposer,
  validateMagento
} from './src/validators.mjs';
import {
  replaceJSONContents,
  renameTheme,
  renameBrowserSyncPaths,
  createDirectory,
  createThmeRegistrationFiles
} from './src/local-env-actions.mjs'
import {
  installFrontools,
  compileFiles
} from './src/frontools-actions.mjs'
import { composerRequire } from './src/composer-actions.mjs';
import { magentoUpgrade } from './src/magento-actions.mjs'
const alpacaPackagesPath = 'snowdog/module-alpaca-packages'
const frontoolsPath = 'snowdog/frontools'
const progressBar = new cliProgress.SingleBar({
  format: 'Progress: |' + _colors.cyan('{bar}') + '| {percentage}% || {info}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
});
const log = console.log
const barInfoColor = _colors.yellow
const blue = _colors.blue
const red = _colors.red

/*
  Check if valid Magento instance. If not throw error.
*/
if (validateMagento()) {
  console.clear()
  log(blue('Snowdog Alpaca Theme CLI v1.0.0\n'))
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
      console.time(blue('Finished in'))
      progressBar.start(100, 0, {
        info: barInfoColor("Validating composer..."),
      })
      await validateComposer()

      progressBar.update(2, {
        info: barInfoColor("Downloading Alpaca Packages...")
      });
      await composerRequire(alpacaPackagesPath)

      progressBar.update(30, {
        info: barInfoColor("Downloading Frontools...")
      });
      await composerRequire(frontoolsPath)

      progressBar.update(45, {
        info: barInfoColor("Installing frontools...")
      });
      await installFrontools()

      progressBar.update(55, {
        info: barInfoColor("Configuring themes.json...")
      });
      const themesJson = JSON.parse(await readFile(new URL('./templates/themes.json', import.meta.url)));
      await replaceJSONContents('dev/tools/frontools/config/themes.json', themesJson)

      progressBar.update(57, {
        info: barInfoColor("Replace theme name in themes.json with your theme name")
      });
      await renameTheme('dev/tools/frontools/config/themes.json', answers.name)

      progressBar.update(59, {
        info: barInfoColor("Configuring browser-sync.json...")
      });
      const browserSyncJson = JSON.parse(await readFile(new URL('./templates/browser-sync.json', import.meta.url)));
      await replaceJSONContents('dev/tools/frontools/config/browser-sync.json', browserSyncJson)

      progressBar.update(61, {
        info: barInfoColor("Replace theme name in browser-sync.json with your theme name")
      });
      await renameBrowserSyncPaths('dev/tools/frontools/config/browser-sync.json', answers.name)

      progressBar.update(63, {
        info: barInfoColor("Creating child theme directory...")
      });
      await createDirectory(`app/design/frontend/${answers.name}`)

      progressBar.update(65, {
        info: barInfoColor("Creating theme.xml file...")
      });
      const themeXML = await readFile(new URL('./templates/theme.xml', import.meta.url));
      const themeXMLUpdated = themeXML.toString().replace(/YOUR_THEME_NAME/gim, answers.name)
      createThmeRegistrationFiles(`app/design/frontend/${answers.name}/theme.xml`, themeXMLUpdated)

      progressBar.update(67, {
        info: barInfoColor("Creating registration.php file...")
      });
      const registrationPhp = await readFile(new URL('./templates/registration.php', import.meta.url));
      const registrationPHPupdated = registrationPhp.toString().replace(/YOUR_THEME_NAME/gim, answers.name)
      createThmeRegistrationFiles(`app/design/frontend/${answers.name}/registration.php`, registrationPHPupdated)

      progressBar.update(70, {
        info: barInfoColor("Upgrading magneto instance...")
      });
      await magentoUpgrade()

      progressBar.update(90, {
        info: barInfoColor("Compiling files...W")
      });
      await compileFiles()

      progressBar.update(100, {
        info: blue("Enjoy Alpaca :)")
      });
      progressBar.stop();
      console.timeEnd(blue('Finished in'))
    }
    catch (exception_var) {
      progressBar.update(0, {
        info: red("Installation failed, fix issues logged below and try again.")
      });
      progressBar.stop();
      log(`\n${red(exception_var)}`)
      process.exit()
    }
    finally {
      log(blue('Installation finished succefuly!'))
      log(blue('Go to Admin Panel -> Content -> Design -> Configuration and choose your theme.'))
      log(blue('Visit Alpaca Docs to learn how to fully utlize Alpaca Theme.'))
      log(barInfoColor('2021 || https://snow.dog || https://github.com/SnowdogApps'))
    }
  })
}