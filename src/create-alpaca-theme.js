import { readFile } from 'fs/promises'
import colors from 'colors'
import Inquirer from 'inquirer'
import cliProgress from 'cli-progress'
import Spinner from '../utils/spinner.js'
import { CLISuccesMessage } from '../utils/messages.js'
import { magentoUpgrade } from './magento-actions.js'
import { composerRequire } from './composer-actions.js'
import { addFile, installComponents } from './components-actions.js'
import { installFrontools, compileFiles } from './frontools-actions.js'
import {
  validateName,
  validateComposer,
  isMagentoInstance,
  validateRegistrationName
} from './validators.js'
import {
  createFile,
  createDirectory,
  addChildThemeFile,
  addTemplateFile
} from './local-env-actions.js'
import {
  BASE_PATH,
  LOADING_BAR,
  PACKAGE_PATH,
  TEMPLATE_PATHS,
  LOCAL_ENV_PATHS,
  NOT_MAGENTO_MSG_TOP,
  CHECK_MARK_CHARACTER,
  NOT_MAGENTO_MSG_BOTTOM
} from '../utils/constants.js'
import { readFileSync } from 'fs'

const { log } = console
const spinner = new Spinner()
const infoColor = colors.yellow
const bar = new cliProgress.SingleBar({
  format: LOADING_BAR.FORMAT,
  barCompleteChar: LOADING_BAR.COMPLETE_CHAR,
  barIncompleteChar: LOADING_BAR.INCOMPLETE_CHAR,
  hideCursor: LOADING_BAR.CURSOR_HIDDEN,
  barsize: LOADING_BAR.SIZE
})

const templateFiles = [
  {
    name: '.browserslistrc',
    templateFilePath: TEMPLATE_PATHS.BROWSER_LIST_RC,
    childFileDestination: '/Snowdog_Components/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: '.editorconfig',
    templateFilePath: TEMPLATE_PATHS.EDITOR_CONFIG,
    childFileDestination: '/Snowdog_Components/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: '.eslintignore',
    templateFilePath: TEMPLATE_PATHS.ESLINT_IGNORE,
    childFileDestination: '/Snowdog_Components/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: '.eslintrc.json',
    templateFilePath: TEMPLATE_PATHS.ESLINT_RC,
    childFileDestination: '/Snowdog_Components/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: '.node-version',
    templateFilePath: TEMPLATE_PATHS.NODE_VERSIONS,
    childFileDestination: '/Snowdog_Components/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: '.sass-lint.yml',
    templateFilePath: TEMPLATE_PATHS.SASS_LINT,
    childFileDestination: '/Snowdog_Components/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: '.stylelintrc',
    templateFilePath: TEMPLATE_PATHS.STYLE_LINT_RC,
    childFileDestination: '/Snowdog_Components/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: 'gulpfile.mjs',
    templateFilePath: TEMPLATE_PATHS.GULPFILE,
    childFileDestination: '/Snowdog_Components/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: 'package.json',
    templateFilePath: TEMPLATE_PATHS.PACKAGE_JSON,
    childFileDestination: '/Snowdog_Components/',
    rename: true,
    phraseToRename: 'alpaca-components',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: 'modules.mjs',
    templateFilePath: TEMPLATE_PATHS.MODULES_MJS,
    childFileDestination: '/Snowdog_Components/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: true,
    addThemeNameToFileName: false
  },
  {
    name: 'checkout.scss',
    templateFilePath: TEMPLATE_PATHS.DOCS_CHECKOUT_SCSS,
    childFileDestination: '/Snowdog_Components/docs/styles/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: 'styles.scss',
    templateFilePath: TEMPLATE_PATHS.DOCS_STYLES_SCSS,
    childFileDestination: '/Snowdog_Components/docs/styles/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: 'checkout.scss',
    templateFilePath: TEMPLATE_PATHS.MAGENTO_CHECKOUT_SCSS,
    childFileDestination: '/Magento_Checkout/styles/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: 'critical.scss',
    templateFilePath: TEMPLATE_PATHS.CRITICAL_STYLES,
    childFileDestination: '/styles/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: 'styles.scss',
    templateFilePath: TEMPLATE_PATHS.THEME_STYLES,
    childFileDestination: '/styles/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: 'theme.xml',
    templateFilePath: TEMPLATE_PATHS.THEME_XML,
    childFileDestination: '/',
    rename: true,
    phraseToRename: 'YOUR_THEME_NAME',
    useSampleTemplate: true,
    addThemeNameToFileName: false
  },
  {
    name: 'registration.php',
    templateFilePath: TEMPLATE_PATHS.REGISTRATION,
    childFileDestination: '/',
    rename: true,
    phraseToRename: 'YOUR_THEME_NAME',
    useSampleTemplate: true,
    addThemeNameToFileName: false
  },
  {
    name: '.gitignore',
    templateFilePath: TEMPLATE_PATHS.GITIGNORE,
    childFileDestination: '/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false
  },
  {
    name: 'README.md',
    templateFilePath: TEMPLATE_PATHS.README,
    childFileDestination: '/',
    rename: true,
    phraseToRename: 'YOUR_THEME_NAME',
    useSampleTemplate: true,
    addThemeNameToFileName: false
  },
  {
    name: 'CHANGELOG.md',
    templateFilePath: TEMPLATE_PATHS.CHANGELOG,
    childFileDestination: '/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: true,
    addThemeNameToFileName: false
  },
  {
    name: 'themes.json',
    templateFilePath: TEMPLATE_PATHS.THEMES_JSON,
    childFileDestination: LOCAL_ENV_PATHS.THEMES_JSON,
    rename: true,
    phraseToRename: 'YOUR_THEME_NAME',
    useSampleTemplate: true,
    addThemeNameToFileName: false
  },
  {
    name: 'browser-sync.json',
    templateFilePath: TEMPLATE_PATHS.BROWSER_SYNC,
    childFileDestination: LOCAL_ENV_PATHS.BROWSER_SYNC,
    rename: true,
    phraseToRename: 'YOUR_THEME_NAME',
    useSampleTemplate: true,
    addThemeNameToFileName: false
  },
  {
    name: 'variables.scss',
    templateFilePath: TEMPLATE_PATHS.THEME_VARIABLES,
    childFileDestination: '/Snowdog_Components/components/Atoms/variables/',
    rename: false,
    phraseToRename: '',
    useSampleTemplate: false,
    addThemeNameToFileName: true
  }
]

const promptQuestions = [
  {
    type: 'input',
    message: 'Enter your theme full name:',
    name: 'fullName',
    validate: validateName
  },
  {
    type: 'input',
    message: `Enter theme registration name (${colors.yellow('one string, eg. child-theme')}):`,
    name: 'name',
    validate: validateRegistrationName
  }
]

/* eslint-disable */

const init = () => {
  /* BEFORE INITIALIZING CHECK IF VALID MAGENTO INSTANCE */
  if (isMagentoInstance()) {
    console.clear()
    log(colors.blue('Snowdog Alpaca Theme CLI v1.0.0\n'))
    log('new version')

    Inquirer.prompt(promptQuestions).then(async (answers) => {
      try {
        console.time(colors.blue('Finished in')) // Start time counter
        spinner.start()
        bar.start(100, 0, { info: infoColor('Validating composer...') })
        await validateComposer()

        // Creating, registering copying files of Alpaca Theme and Child Theme
        bar.update(2, { info: infoColor('Downloading Alpaca Packages...') })
        /* ENABLE AFTER FEATURE-PERFORMANCE REALEASE */
        // await composerRequire(PACKAGE_PATH.ALPACA_PACKAGES)

        /* TEMP - DELETE AFTER FEATURE-PERFORMANCE REALEASE */
        await composerRequire(PACKAGE_PATH.THEME_FRONTEND_ALPACA_TEST)

        bar.update(20, { info: infoColor('Downloading Frontools...') })
        await composerRequire(PACKAGE_PATH.FRONTOOLS)

        bar.update(30, { info: infoColor('Installing Frontools...') })
        await installFrontools()


        bar.update(40, { info: infoColor('Creating child theme directory...') })
        await createDirectory(`${BASE_PATH}${answers.name}`)

        // Scaffolding Snowdog_Components and related files
        bar.update(50, { info: infoColor('Creating Snowdog_Components directories...') })
        await createDirectory(`${BASE_PATH}${answers.name}/Snowdog_Components/docs/styles`)
        await createDirectory(`${BASE_PATH}${answers.name}/Snowdog_Components/components/Atoms/variables`)
        await createDirectory(`${BASE_PATH}${answers.name}/Magento_Checkout/styles`)
        await createDirectory(`${BASE_PATH}${answers.name}/styles`)

        templateFiles.forEach(file => {
          bar.increment(0.5, { info: infoColor(`Creating ${file.name} file...`) })
          addTemplateFile(file, answers.name, answers.fullName)
        })

        bar.update(60, { info: infoColor('Installing Snowdog Components...') })
        await installComponents(answers.name)

        // Magento and Frontools tasks
        bar.update(70, { info: infoColor('Upgrading Magneto instance...') })
        await magentoUpgrade()

        bar.update(90, { info: infoColor('Compiling files...') })
        await compileFiles()

        // After succes tasks
        bar.update(100, { info: colors.blue('Enjoy Alpaca :)') })
        process.stdout.write(`\r${CHECK_MARK_CHARACTER}`)
        spinner.stop()
        bar.stop()
        console.timeEnd(colors.blue('Finished in')) // Stop time counter
        CLISuccesMessage(answers.fullName)
      } catch (error) {
        bar.update(0, { info: colors.red('Installation failed.') })
        spinner.stop()
        bar.stop()
        log(`\n${colors.red(error)}`)
        process.exit()
      }
    })
  } else {
    console.error(
      colors.red(NOT_MAGENTO_MSG_TOP),
      `\n${colors.yellow(NOT_MAGENTO_MSG_BOTTOM)}`
    )
  }
}

export default init
