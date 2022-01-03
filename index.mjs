#!/usr/bin/env node

import inquirer from 'inquirer';
import cliProgress from 'cli-progress';
import _colors from 'colors'
import { readFile } from 'fs/promises';
import {
  validateInput,
  validateComposer,
  isMagentoInstance
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
const barInfoColor = _colors.yellow
const blue = _colors.blue
const red = _colors.red
const log = console.log
const spinnerPath = ["\\", "|", "/", "-"];
const spinnerSpeed = 100;
const progressBar = new cliProgress.SingleBar({
  format: '  |' + _colors.cyan('{bar}') + '| {percentage}% || {info}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
});

/*
  Check if valid Magento instance. If not throw error.
*/
if (isMagentoInstance()) {
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
      let iteratorValue = 0; // Spinner character iterator value
      const spinner = setInterval(() => {
        process.stdout.write("\r" + spinnerPath[iteratorValue++]);
        iteratorValue &= 3;
      }, spinnerSpeed);

      console.time(blue('Finished in')) // Start task time counter

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
        info: barInfoColor("Installing Frontools...")
      });
      await installFrontools()

      progressBar.update(55, {
        info: barInfoColor("Configuring themes.json...")
      });
      const themesJson = JSON.parse(await readFile(new URL('./templates/themes.json.sample', import.meta.url)));
      replaceJSONContents('dev/tools/frontools/config/themes.json', themesJson)

      progressBar.update(57, {
        info: barInfoColor("Replace theme name in themes.json with your theme name")
      });
      renameTheme('dev/tools/frontools/config/themes.json', answers.name)

      progressBar.update(59, {
        info: barInfoColor("Configuring browser-sync.json...")
      });
      const browserSyncJson = JSON.parse(await readFile(new URL('./templates/browser-sync.json.sample', import.meta.url)));
      replaceJSONContents('dev/tools/frontools/config/browser-sync.json', browserSyncJson)

      progressBar.update(61, {
        info: barInfoColor("Replace theme name in browser-sync.json with your theme name")
      });
      renameBrowserSyncPaths('dev/tools/frontools/config/browser-sync.json', answers.name)

      progressBar.update(63, {
        info: barInfoColor("Creating child theme directory...")
      });
      createDirectory(`app/design/frontend/Snowdog/${answers.name}`)

      progressBar.update(65, {
        info: barInfoColor("Creating theme.xml file...")
      });
      const themeXML = await readFile(new URL('./templates/theme.xml.sample', import.meta.url));
      const themeXMLUpdated = themeXML.toString().replace(/YOUR_THEME_NAME/gim, answers.name)
      createThmeRegistrationFiles(`app/design/frontend/Snowdog/${answers.name}/theme.xml`, themeXMLUpdated)

      progressBar.update(67, {
        info: barInfoColor("Creating registration.php file...")
      });
      const registrationPhp = await readFile(new URL('./templates/registration.php.sample', import.meta.url));
      const registrationPhpUpdated = registrationPhp.toString().replace(/YOUR_THEME_NAME/gim, answers.name)
      createThmeRegistrationFiles(`app/design/frontend/Snowdog/${answers.name}/registration.php`, registrationPhpUpdated)

      progressBar.update(70, {
        info: barInfoColor("Upgrading Magneto instance...")
      });
      await magentoUpgrade()

      progressBar.update(90, {
        info: barInfoColor("Compiling files...")
      });
      await compileFiles()

      progressBar.update(100, {
        info: blue("Enjoy Alpaca :)")
      });

      clearInterval(spinner)
      process.stdout.write("\r" + '\u2713') // Unicode check mark character
      progressBar.stop();
      console.timeEnd(blue('Finished in')) // Stop task time counter

      log(blue('\nInstallation finished succefuly!'))
      log(blue('Go to Admin Panel -> Content -> Design -> Configuration and choose your theme'), `(${barInfoColor(answers.name)}).`)
      log(blue('\nVisit Alpaca Docs to learn how to work with Alpaca Theme.'))
      log(blue('To see exemplary code go to Alpaca Boilerplate.\n'))
      log(barInfoColor('2022 Snowdog || https://snow.dog || https://github.com/SnowdogApps \n'))
    }
    catch (exception_var) {
      progressBar.update(0, {
        info: red("Installation failed.")
      });
      progressBar.stop();
      log(`\n${red(exception_var)}`)
      process.exit()
    }
  })
}