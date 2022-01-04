#!/usr/bin/env node

import inquirer from 'inquirer';
import cliProgress from 'cli-progress';
import colors from 'colors'
import Spinner from './utils/spinner.mjs'
import { readFile } from 'fs/promises';
import { composerRequire } from './src/composer-actions.mjs';
import { magentoUpgrade } from './src/magento-actions.mjs'
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
import {
  NOT_MAGENTO_MSG_BOTTOM,
  NOT_MAGENTO_MSG_TOP,
  CHECK_MARK_CHARACTER,
  PACKAGE_PATH,
  LOADING_BAR,
  TEMPLATE_PATHS,
  LOCAL_ENV_PATHS
} from './utils/constants.mjs';

const log = console.log
const barInfoColor = colors.yellow
const progressBar = new cliProgress.SingleBar({
  format: LOADING_BAR.FORMAT,
  barCompleteChar: LOADING_BAR.COMPLETE_CHAR,
  barIncompleteChar: LOADING_BAR.INCOMPLETE_CHAR,
  hideCursor: LOADING_BAR.CURSOR_HIDDEN,
  barsize: LOADING_BAR.SIZE
});
const spinner = new Spinner()

/*
  Check if valid Magento instance. If not log error.
*/
if (isMagentoInstance()) {
  console.clear()
  log(colors.blue('Snowdog Alpaca Theme CLI v1.0.0\n'))

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
      console.time(colors.blue('Finished in')) // Start task time counter
      spinner.start()

      progressBar.start(100, 0, {
        info: barInfoColor("Validating composer..."),
      })
      await validateComposer()

      progressBar.update(2, {
        info: barInfoColor("Downloading Alpaca Packages...")
      });
      await composerRequire(PACKAGE_PATH.ALPACA_PACKAGES)

      progressBar.update(30, {
        info: barInfoColor("Downloading Frontools...")
      });
      await composerRequire(PACKAGE_PATH.FRONTOOLS)

      progressBar.update(45, {
        info: barInfoColor("Installing Frontools...")
      });
      await installFrontools()

      progressBar.update(55, {
        info: barInfoColor("Configuring themes.json...")
      });
      const themesJson = JSON.parse(await readFile(new URL(TEMPLATE_PATHS.THEMES_JSON, import.meta.url)));
      replaceJSONContents(LOCAL_ENV_PATHS.THEMES_JSON, themesJson)

      progressBar.update(57, {
        info: barInfoColor("Replace theme name in themes.json with your theme name")
      });
      renameTheme(LOCAL_ENV_PATHS.THEMES_JSON, answers.name)

      progressBar.update(59, {
        info: barInfoColor("Configuring browser-sync.json...")
      });
      const browserSyncJson = JSON.parse(await readFile(new URL(TEMPLATE_PATHS.BROWSER_SYNC, import.meta.url)));
      replaceJSONContents(LOCAL_ENV_PATHS.BROWSER_SYNC, browserSyncJson)

      progressBar.update(61, {
        info: barInfoColor("Replace theme name in browser-sync.json with your theme name")
      });
      renameBrowserSyncPaths(LOCAL_ENV_PATHS.BROWSER_SYNC, answers.name)

      progressBar.update(63, {
        info: barInfoColor("Creating child theme directory...")
      });
      createDirectory(`app/design/frontend/Snowdog/${answers.name}`)

      progressBar.update(65, {
        info: barInfoColor("Creating theme.xml file...")
      });
      const themeXML = await readFile(new URL(TEMPLATE_PATHS.THEME_XML, import.meta.url));
      const themeXMLUpdated = themeXML.toString().replace(/YOUR_THEME_NAME/gim, answers.name)
      createThmeRegistrationFiles(`app/design/frontend/Snowdog/${answers.name}/theme.xml`, themeXMLUpdated)

      progressBar.update(67, {
        info: barInfoColor("Creating registration.php file...")
      });
      const registrationPhp = await readFile(new URL(TEMPLATE_PATHS.REGISTRATION, import.meta.url));
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
        info: colors.blue("Enjoy Alpaca :)")
      });

      process.stdout.write("\r" + CHECK_MARK_CHARACTER)
      spinner.stop()
      progressBar.stop();
      console.timeEnd(colors.blue('Finished in')) // Stop task time counter

      log(colors.blue('\nInstallation finished succefuly!'))
      log(colors.blue('Go to Admin Panel -> Content -> Design -> Configuration and choose your theme'), `(${barInfoColor(answers.name)}).`)
      log(colors.blue('\nVisit Alpaca Docs to learn how to work with Alpaca Theme.'))
      log(colors.blue('To see exemplary code go to Alpaca Boilerplate.\n'))
      log(barInfoColor('2022 Snowdog || https://snow.dog || https://github.com/SnowdogApps \n'))
    }
    catch (error) {
      progressBar.update(0, {
        info: colors.red("Installation failed.")
      });
      spinner.stop()
      progressBar.stop();
      log(`\n${colors.red(error)}`)
      process.exit()
    }
  })
} else {
  console.error(colors.colors.red(NOT_MAGENTO_MSG_TOP))
  console.error(colors.yellow(NOT_MAGENTO_MSG_BOTTOM))
}