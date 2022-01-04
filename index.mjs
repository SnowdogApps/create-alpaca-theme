#!/usr/bin/env node

import inquirer from 'inquirer';
import cliProgress from 'cli-progress';
import colors from 'colors'
import Spinner from './utils/spinner.mjs'
import { readFile } from 'fs/promises';
import { composerRequire } from './src/composer-actions.mjs';
import { magentoUpgrade } from './src/magento-actions.mjs'
import { addFile, installComponents } from './src/components-actions.mjs';
import {
  validateName,
  validateRegistrationName,
  validateComposer,
  isMagentoInstance
} from './src/validators.mjs';
import {
  createDirectory,
  createFile,
  addChildThemeFile
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

const spinner = new Spinner()
const log = console.log
const barInfoColor = colors.yellow
const progressBar = new cliProgress.SingleBar({
  format: LOADING_BAR.FORMAT,
  barCompleteChar: LOADING_BAR.COMPLETE_CHAR,
  barIncompleteChar: LOADING_BAR.INCOMPLETE_CHAR,
  hideCursor: LOADING_BAR.CURSOR_HIDDEN,
  barsize: LOADING_BAR.SIZE
})
const snowdogComponentsFiles = [
  { name: '.editorconfig', path: TEMPLATE_PATHS.EDITOR_CONFIG },
  { name: '.eslintignore', path: TEMPLATE_PATHS.ESLINT_IGNORE },
  { name: '.eslintrc.json', path: TEMPLATE_PATHS.ESLINT_RC },
  { name: '.node-version', path: TEMPLATE_PATHS.NODE_VERSIONS },
  { name: '.sass-lint.yml', path: TEMPLATE_PATHS.SASS_LINT },
  { name: '.stylelintrc', path: TEMPLATE_PATHS.STYLE_LINT_RC },
  { name: 'gulpfile.js', path: TEMPLATE_PATHS.GULPFILE, },
  { name: 'modules.json ', path: TEMPLATE_PATHS.MODULES_JSON, },
]
const styleCssFiles = [
  { name: 'checkout.scss', path: TEMPLATE_PATHS.DOCS_CHECKOUT_SCSS, dirPath: 'Snowdog_Components/docs/styles/checkout.scss'},
  { name: 'styles.scss', path: TEMPLATE_PATHS.DOCS_STYLES_SCSS, dirPath: 'Snowdog_Components/docs/styles/styles.scss'},
  { name: 'checkout.scss', path: TEMPLATE_PATHS.MAGENTO_CHECKOUT_SCSS, dirPath: 'Magento_Checkout/checkout.scss'},
  { name: 'critical.scss', path: TEMPLATE_PATHS.CRITICAL_STYLES, dirPath: 'styles/critical.scss'},
  { name: 'styles.scss', path: TEMPLATE_PATHS.THEME_STYLES, dirPath: 'styles/styles.scss'},
]
const childThemeFiles = [
  {
    name: 'themes.json',
    path: TEMPLATE_PATHS.THEMES_JSON,
    dirPath: LOCAL_ENV_PATHS.THEMES_JSON,
    shouldReplace: true
  },
  {
    name: 'browser-sync.json',
    path: TEMPLATE_PATHS.BROWSER_SYNC,
    dirPath: LOCAL_ENV_PATHS.BROWSER_SYNC,
    shouldReplace: true
  },
  {
    name: 'theme.xml',
    path: TEMPLATE_PATHS.THEME_XML,
    shouldReplace: true
  },
  {
    name: 'registration.php',
    path: TEMPLATE_PATHS.REGISTRATION,
    shouldReplace: true
  },
  {
    name: '.gitignore',
    path: TEMPLATE_PATHS.GITIGNORE,
  },
  {
    name: 'README.md',
    path: TEMPLATE_PATHS.README,
    shouldReplace: true
  },
  {
    name: 'CHANGELOG.md',
    path: TEMPLATE_PATHS.CHANGELOG,
  },
]


// Check if valid Magento instance. If not log error.
if (isMagentoInstance()) {
  console.clear()
  log(colors.blue('Snowdog Alpaca Theme CLI v1.0.0\n'))

  inquirer.prompt([
    {
      type: 'input',
      message: "Enter your theme name:",
      name: 'name',
      validate: validateName
    }
    // {
    //   type: 'input',
    //   message: `Enter theme registration name (${colors.yellow('One word, could be in camelCase etc.')}):`,
    //   name: 'registrationName',
    //   validate: validateRegistrationName
    // }
  ])
  .then(async answers => {
    try {
      console.time(colors.blue('Finished in')) // Start task time counter
      spinner.start()

      progressBar.start(100, 0, {
        info: barInfoColor("Validating composer..."),
      })
      await validateComposer()

     // Creating, registering copying files of Alpaca Theme and Child Theme
      progressBar.update(2, {
        info: barInfoColor("Downloading Alpaca Packages...")
      });
      await composerRequire(PACKAGE_PATH.ALPACA_PACKAGES)

      progressBar.update(25, {
        info: barInfoColor("Downloading Frontools...")
      });
      await composerRequire(PACKAGE_PATH.FRONTOOLS)

      progressBar.update(35, {
        info: barInfoColor("Installing Frontools...")
      });
      await installFrontools()

      progressBar.update(45, {
        info: barInfoColor("Creating child theme directory...")
      });
      await createDirectory(`app/design/frontend/Snowdog/${answers.name}`)

      childThemeFiles.forEach((file) => {
        progressBar.increment(1, {
          info: barInfoColor(`Creating ${file.name} file...`)
        });
        addChildThemeFile(file.path, file.name, answers.name, file.dirPath, file.shouldReplace)
      })

      // Scaffolding Snowdog_Components and related files
      progressBar.update(54, {
        info: barInfoColor("Creating Snowdog_Components directories...")
      });
      await createDirectory(`app/design/frontend/Snowdog/${answers.name}/Snowdog_Components/docs/styles`)
      await createDirectory(`app/design/frontend/Snowdog/${answers.name}/Snowdog_Components/components/atoms/variables`)
      await createDirectory(`app/design/frontend/Snowdog/${answers.name}/Magento_Checkout`)
      await createDirectory(`app/design/frontend/Snowdog/${answers.name}/styles`)

      progressBar.update(58, {
        info: barInfoColor("Creating package.json file...")
      });
      const packageJson = await readFile(new URL(TEMPLATE_PATHS.PACKAGE_JSON, import.meta.url));
      const packageJsonUpdated = packageJson.toString().replace(/YOUR_THEME_NAME/gim, answers.name)
      createFile(`app/design/frontend/Snowdog/${answers.name}/Snowdog_Components/package.json`, packageJsonUpdated)

      progressBar.update(59, {
        info: barInfoColor("Creating theme-variables.scss file...")
      });
      const themeVariables = await readFile(new URL(TEMPLATE_PATHS.THEME_VARIABLES, import.meta.url));
      createFile(`app/design/frontend/Snowdog/${answers.name}/Snowdog_Components/components/atoms/variables/_${answers.name}-variables.scss`, themeVariables)

      snowdogComponentsFiles.forEach((file) => {
        progressBar.increment(1, {
          info: barInfoColor(`Creating ${file.name} file...`)
        });
        addFile(file.path, file.name, answers.name)
      })

      styleCssFiles.forEach((file) => {
        progressBar.increment(1, {
          info: barInfoColor(`Creating ${file.name} file...`)
        });
        addFile(file.path, file.name, answers.name, `app/design/frontend/Snowdog/${answers.name}/${file.dirPath}`)
      })

      progressBar.update(65, {
        info: barInfoColor("Installing Snowdog Components...")
      });
      await installComponents(answers.name)

      // Magento and Frontools tasks
      progressBar.update(77, {
        info: barInfoColor("Upgrading Magneto instance...")
      });
      await magentoUpgrade()

      progressBar.update(93, {
        info: barInfoColor("Compiling files...")
      });
      await compileFiles()

      // After succes tasks
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