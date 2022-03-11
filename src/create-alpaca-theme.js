import colors from 'colors'
import Inquirer from 'inquirer'
import cliProgress from 'cli-progress'
import Spinner from '../utils/spinner.js'
import runQueries from './database-actions.js'
import { magentoUpgrade } from './magento-actions.js'
import { composerRequire } from './composer-actions.js'
import { installComponents } from './components-actions.js'
import {
  mediaDirList,
  directoriesList,
  exemplaryComponentDirectories
} from '../constants/directioriesList.js'
import {
  CLISuccesMessage,
  databaseErrorMessage,
  notMagentoInstanceMessage
} from '../utils/messages.js'
import {
  templateFiles,
  templateMedia,
  exemplaryComponent
} from '../constants/filesList.js'
import {
  installFrontools,
  compileFiles
} from './frontools-actions.js'
import {
  validateName,
  validateConfigFiles,
  validateComposer,
  validateMagentoInstance,
  validateRegistrationName
} from './validators.js'
import {
  createDirectory,
  addTemplateFile,
  copyImage
} from './local-env-actions.js'
import {
  BASE_PATH,
  LOADING_BAR,
  PACKAGE_PATH,
  CHECK_MARK_CHARACTER
} from '../constants/constants.js'

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
const promptQuestions = [
  {
    type: 'input',
    message: `Enter theme full name (${colors.yellow('e.g. Child Theme')}):`,
    name: 'fullName',
    validate: validateName
  },
  {
    type: 'input',
    message: `Enter theme registration name (${colors.yellow('one phrase, e.g. child-theme')}):`,
    name: 'name',
    validate: validateRegistrationName
  },
  {
    type: 'confirm',
    message: `Extend exemplary Alpaca Component? (${colors.yellow('Recommended')})`,
    name: 'exemplaryComponent'
  },
  {
    type: 'confirm',
    message: `Update database with essential Alpaca tables? (${colors.yellow('Recommended')})`,
    name: 'database'
  }
]
let dbErrors = []

function init() {
  if (!validateMagentoInstance()) {
    notMagentoInstanceMessage()

    process.exit(1)
  }

  console.clear()
  log(colors.blue('Snowdog Alpaca Theme CLI v1.0.0\n'))

  Inquirer.prompt(promptQuestions).then(async (answers) => {
    try {
      console.time(colors.blue('Finished in')) // Start time counter
      spinner.start()
      bar.start(100, 0, { info: infoColor('Validating Magento config files...') })
      validateConfigFiles()

      bar.update(1, { info: infoColor('Validating composer...') })
      await validateComposer()

      bar.update(2, { info: infoColor('Downloading Alpaca Packages...') })
      await composerRequire(PACKAGE_PATH.ALPACA_PACKAGES)
      await composerRequire(PACKAGE_PATH.THEME_FRONTEND_ALPACA)

      bar.update(16, { info: infoColor('Downloading Frontools...') })
      await composerRequire(PACKAGE_PATH.FRONTOOLS)

      bar.update(31, { info: infoColor('Installing Frontools...') })
      await installFrontools()

      bar.update(35, { info: infoColor('Creating directories...') })
      await Promise.all(directoriesList.map(async (dir) => {
        await createDirectory(`${BASE_PATH}${answers.name}${dir}`)
      }))

      templateFiles.forEach((file) => {
        bar.increment(0.5, { info: infoColor(`Creating ${file.name} file...`) })
        addTemplateFile(file, answers.name, answers.fullName)
      })

      if (answers.exemplaryComponent) {
        await Promise.all(exemplaryComponentDirectories.map(async (dir) => {
          await createDirectory(`${BASE_PATH}${answers.name}${dir}`)
        }))

        exemplaryComponent.forEach((file) => {
          bar.increment(0.5, { info: infoColor(`Creating ${file.name} file...`) })
          addTemplateFile(file, answers.name, answers.fullName)
        })
      }

      bar.update(40, { info: infoColor('Installing Snowdog Components...') })
      await installComponents(answers.name)

      if (answers.database) {
        bar.update(55, { info: infoColor('Running database queries...') })
        dbErrors = await runQueries()

        bar.update(56, { info: infoColor('Creating media directories...') })
        await Promise.all(mediaDirList.map(async (dir) => {
          await createDirectory(dir)
        }))

        bar.update(57, { info: infoColor('Copying media...') })
        templateMedia.forEach((img) => {
          copyImage(img)
        })
      }

      bar.update(60, { info: infoColor('Upgrading Magneto instance...') })
      await magentoUpgrade()

      bar.update(87, { info: infoColor('Compiling files...') })
      await compileFiles()

      bar.update(100, { info: colors.blue('Enjoy Alpaca 🦙') })
      process.stdout.write(`\r${CHECK_MARK_CHARACTER}`)
      spinner.stop()
      bar.stop()
      console.timeEnd(colors.blue('Finished in')) // Stop time counter
      CLISuccesMessage(answers.fullName)

      if (dbErrors.length !== 0) {
        databaseErrorMessage()
        dbErrors.forEach((err) => {
          log(colors.magenta(err))
        })
      }
    } catch (error) {
      bar.update(0, { info: colors.red('Installation failed.') })
      spinner.stop()
      bar.stop()
      log(`\n${colors.red(error)}`)

      process.exit(1)
    }
  })
}

export default init
