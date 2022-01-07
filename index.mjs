#!/usr/bin/env node

import Inquirer from 'inquirer';
import cliProgress from 'cli-progress';
import colors from 'colors'
import Spinner from './utils/spinner.mjs'
import { CLISuccesMessage } from './utils/messages.mjs';
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

const log = console.log
const spinner = new Spinner()
const infoColor = colors.yellow
const bar = new cliProgress.SingleBar({
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
  { name: 'gulpfile.mjs', path: TEMPLATE_PATHS.GULPFILE },
  { name: 'modules.mjs', path: TEMPLATE_PATHS.MODULES_MJS },
  { name: '.browserslistrc', path: TEMPLATE_PATHS.BROWSER_LIST_RC }
]
const styleCssFiles = [
  { name: 'checkout.scss', path: TEMPLATE_PATHS.DOCS_CHECKOUT_SCSS, dirPath: 'Snowdog_Components/docs/styles/checkout.scss' },
  { name: 'styles.scss', path: TEMPLATE_PATHS.DOCS_STYLES_SCSS, dirPath: 'Snowdog_Components/docs/styles/styles.scss' },
  { name: 'checkout.scss', path: TEMPLATE_PATHS.MAGENTO_CHECKOUT_SCSS, dirPath: 'Magento_Checkout/styles/checkout.scss' },
  { name: 'critical.scss', path: TEMPLATE_PATHS.CRITICAL_STYLES, dirPath: 'styles/critical.scss' },
  { name: 'styles.scss', path: TEMPLATE_PATHS.THEME_STYLES, dirPath: 'styles/styles.scss' },
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
    dirPath: null,
    shouldReplace: true
  },
  {
    name: 'registration.php',
    path: TEMPLATE_PATHS.REGISTRATION,
    dirPath: null,
    shouldReplace: true
  },
  {
    name: '.gitignore',
    path: TEMPLATE_PATHS.GITIGNORE,
    dirPath: null,
    shouldReplace: false
  },
  {
    name: 'README.md',
    path: TEMPLATE_PATHS.README,
    dirPath: null,
    shouldReplace: true
  },
  {
    name: 'CHANGELOG.md',
    path: TEMPLATE_PATHS.CHANGELOG,
    dirPath: null,
    shouldReplace: false
  },
]
const promptQuestions = [
  {
    type: 'input',
    message: "Enter your theme full name:",
    name: 'fullName',
    validate: validateName
  },
  {
    type: 'input',
    message: `Enter theme registration name (${colors.yellow('one string, ex. child-theme')}):`,
    name: 'name',
    validate: validateRegistrationName
  }
]

/* BEFORE INITIALIZING CHECK IF VALID MAGENTO INSTANCE */
if (isMagentoInstance()) {
  console.clear()
  log(colors.blue('Snowdog Alpaca Theme CLI v1.0.0\n'))

  Inquirer.prompt(promptQuestions).then(async answers => {
    try {
      console.time(colors.blue('Finished in')) // Start task time counter
      spinner.start()
      bar.start(100, 0, { info: infoColor("Validating composer...") })
      await validateComposer()

      // Creating, registering copying files of Alpaca Theme and Child Theme
      bar.update(2, { info: infoColor("Downloading Alpaca Packages...") });
      /* ENABLE AFTER FEATURE-PERFORMANCE REALEASE */
      // await composerRequire(PACKAGE_PATH.ALPACA_PACKAGES)

      /* TEMP - DELETE AFTER FEATURE-PERFORMANCE REALEASE */
      await composerRequire(PACKAGE_PATH.THEME_FRONTEND_ALPACA_TEST)

      bar.update(25, { info: infoColor("Downloading Frontools...") });
      await composerRequire(PACKAGE_PATH.FRONTOOLS)

      bar.update(35, { info: infoColor("Installing Frontools...") });
      await installFrontools()

      bar.update(45, { info: infoColor("Creating child theme directory...") });
      await createDirectory(`app/design/frontend/Snowdog/${answers.name}`)

      childThemeFiles.forEach((file) => {
        bar.increment(1, { info: infoColor(`Creating ${file.name} file...`) });
        if (file.name === 'theme.xml' || file.name === 'README.md')
          addChildThemeFile(file, answers.name, answers.fullName)
        else {
          addChildThemeFile(file, answers.name)
        }
      })

      // Scaffolding Snowdog_Components and related files
      bar.update(54, { info: infoColor("Creating Snowdog_Components directories...") });
      await createDirectory(`app/design/frontend/Snowdog/${answers.name}/Snowdog_Components/docs/styles`)
      await createDirectory(`app/design/frontend/Snowdog/${answers.name}/Snowdog_Components/components/Atoms/variables`)
      await createDirectory(`app/design/frontend/Snowdog/${answers.name}/Magento_Checkout/styles`)
      await createDirectory(`app/design/frontend/Snowdog/${answers.name}/styles`)

      bar.update(58, { info: infoColor("Creating package.json file...") });
      const packageJson = await readFile(new URL(TEMPLATE_PATHS.PACKAGE_JSON, import.meta.url));
      const packageJsonUpdated = packageJson.toString().replace(/YOUR_THEME_NAME/gim, answers.name)
      createFile(`app/design/frontend/Snowdog/${answers.name}/Snowdog_Components/package.json`, packageJsonUpdated)

      bar.update(59, { info: infoColor("Creating theme-variables.scss file...") });
      const themeVariables = await readFile(new URL(TEMPLATE_PATHS.THEME_VARIABLES, import.meta.url));
      createFile(`app/design/frontend/Snowdog/${answers.name}/Snowdog_Components/components/Atoms/variables/_${answers.name}-variables.scss`, themeVariables)

      snowdogComponentsFiles.forEach((file) => {
        bar.increment(1, { info: infoColor(`Creating ${file.name} file...`) });
        addFile(file.path, file.name, answers.name)
      })

      styleCssFiles.forEach((file) => {
        bar.increment(1, { info: infoColor(`Creating ${file.name} file...`) });
        addFile(file.path, file.name, answers.name, `app/design/frontend/Snowdog/${answers.name}/${file.dirPath}`)
      })

      bar.update(65, { info: infoColor("Installing Snowdog Components...") });
      await installComponents(answers.name)

      // Magento and Frontools tasks
      bar.update(77, { info: infoColor("Upgrading Magneto instance...") });
      await magentoUpgrade()

      bar.update(93, { info: infoColor("Compiling files...") });
      await compileFiles()

      // After succes tasks
      bar.update(100, { info: colors.blue("Enjoy Alpaca :)") });
      process.stdout.write("\r" + CHECK_MARK_CHARACTER)
      spinner.stop()
      bar.stop();
      console.timeEnd(colors.blue('Finished in')) // Stop task time counter
      CLISuccesMessage(answers.fullName)
    }
    catch (error) {
      bar.update(0, { info: colors.red("Installation failed.")  });
      spinner.stop()
      bar.stop();
      log(`\n${colors.red(error)}`)
      process.exit()
    }
  })
} else {
  console.error(colors.red(NOT_MAGENTO_MSG_TOP))
  console.error(colors.yellow(NOT_MAGENTO_MSG_BOTTOM))
}