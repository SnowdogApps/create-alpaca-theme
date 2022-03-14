import * as fs from 'fs'
import {
  readFile,
  writeFile,
  readdir,
  rename
} from 'fs/promises'
import {
  VARIABLES_IMPORT_PATHS,
  BASE_PATH
} from '../constants/constants.js'

const ALPACA_THEME_PATH = 'vendor/snowdog/theme-frontend-alpaca'
const ALPACA_STYLES_DIR = `${ALPACA_THEME_PATH}/styles`
const MAGENTO_CHECKOUT_DIR = `${ALPACA_THEME_PATH}/Magento_Checkout/styles`
const ALPACA_COMPONENTS_DIR_PATH = `${ALPACA_THEME_PATH}/Snowdog_Components`
const ALPACA_COMPONENTS_STYLES_DIR = `${ALPACA_COMPONENTS_DIR_PATH}/components/styles`
const ALPACA_COMPONENTS_DOCS_DIR = `${ALPACA_COMPONENTS_DIR_PATH}/docs/styles`

export function createDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

async function createFile(path, payload) {
  return writeFile(path, payload, (err) => {
    if (err) {
      throw err
    }
  })
}

async function listFiles(directory) {
  const dirents = await readdir(directory, { withFileTypes: true })

  return dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name)
}

async function replacePhrase(filePath, phraseToReplace, phraseToReplaceWith) {
  const re = new RegExp(phraseToReplace, 'gim')
  const file = await readFile(filePath)
  const fileUpdated = file.toString().replace(re, phraseToReplaceWith)

  await createFile(filePath, fileUpdated)
}

async function addFilesFromDir(dir, themeName, ignoredFiles, dirInChildTheme = '') {
  const configFiles = await listFiles(dir)
  const re = new RegExp(ignoredFiles)
  const configFilesFiltered = configFiles.filter((str) => !re.test(str))

  await Promise.all(configFilesFiltered.map(async (fileName) => {
    const file = await readFile(`${dir}/${fileName}`)
    await createFile(`${BASE_PATH}${themeName}${dirInChildTheme}/${fileName}`, file)
  }))
}

async function addFilesFromTemplate(templateDir, targetDir) {
  const fileList = await listFiles(new URL(templateDir, import.meta.url))

  await Promise.all(fileList.map(async (fileName) => {
    const file = await readFile(new URL(`${templateDir}/${fileName}`, import.meta.url))
    await createFile(`${targetDir}/${fileName}`, file)
  }))
}

async function editFiles(filesToUpdate, dir) {
  await Promise.all(filesToUpdate.map(async (file) => {
    await replacePhrase(`${dir}/${file.name}`, file.phraseToReplace, file.phraseToReplaceWith)
  }))
}

async function prependImport(
  filePath,
  textToPrepend,
  themeName,
  lineToPrepend = null,
  prependAfterWord = null,
  phraseToReplace = null
) {
  const data = fs.readFileSync(filePath)
  const dataArr = data.toString().split('\n')
  const lineIdx = lineToPrepend || dataArr.findIndex((str) => str.includes(prependAfterWord)) + 2
  const re = phraseToReplace ? new RegExp(phraseToReplace, 'gim') : null

  dataArr.splice(lineIdx, 0, phraseToReplace ? textToPrepend.replace(re, themeName) : textToPrepend)
  const text = dataArr.join('\n')
  const fd = fs.openSync(filePath, 'w+')

  fs.writeSync(fd, text, 0, text.length, 0)
  fs.close(fd)
}

export async function copyImage(imagePaths) {
  const {
    imgTemplatePath,
    localImgPath
  } = imagePaths
  const img = await readFile(new URL(imgTemplatePath, import.meta.url))

  try {
    await createFile(localImgPath, img)
  } catch (error) {
    console.error(`\n${error}`)
  }
}

export async function setupConfigFiles(themeName, fullThemeName) {
  const componentFilesToUpdate = [
    {
      name: 'gulpfile.mjs',
      phraseToReplace: 'Alpaca',
      phraseToReplaceWith: themeName
    },
    {
      name: 'package.json',
      phraseToReplace: 'alpaca-components',
      phraseToReplaceWith: themeName
    }
  ]
  const themeFilesToUpdate = [
    {
      name: 'theme.xml',
      phraseToReplace: 'Alpaca Theme',
      phraseToReplaceWith: fullThemeName
    },
    {
      name: 'registration.php',
      phraseToReplace: 'alpaca',
      phraseToReplaceWith: themeName
    }
  ]
  const frontoolsFilesToUpdate = [
    {
      name: 'browser-sync.json',
      phraseToReplace: 'YOUR_THEME_NAME',
      phraseToReplaceWith: themeName
    },
    {
      name: 'themes.json',
      phraseToReplace: 'YOUR_THEME_NAME',
      phraseToReplaceWith: themeName
    }
  ]

  // Components config files
  await addFilesFromDir(ALPACA_COMPONENTS_DIR_PATH, themeName, '.lock|.md', '/Snowdog_Components')
  await addFilesFromTemplate('../templates/components/config', `${BASE_PATH}${themeName}/Snowdog_Components`)
  await editFiles(componentFilesToUpdate, `${BASE_PATH}${themeName}/Snowdog_Components`)

  // Theme config files
  await addFilesFromDir(ALPACA_THEME_PATH, themeName, '.lock|.md|now|LICENSE|composer')
  await addFilesFromTemplate('../templates/theme', `${BASE_PATH}${themeName}`)
  await editFiles(themeFilesToUpdate, `${BASE_PATH}${themeName}`)

  // Frontools config files
  await addFilesFromTemplate('../templates/frontools', 'dev/tools/frontools/config')
  await editFiles(frontoolsFilesToUpdate, 'dev/tools/frontools/config')
}

export async function addBaseStyles(themeName) {
  const docsFilesNames = await listFiles(`${BASE_PATH}${themeName}/Snowdog_Components/docs/styles`)
  const docsText = VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.DOCS
  const docsPath = `${BASE_PATH}${themeName}/Snowdog_Components/docs/styles`

  // Components docs styles
  await addFilesFromDir(ALPACA_COMPONENTS_DOCS_DIR, themeName, '_', '/Snowdog_Components/docs/styles')
  await Promise.all(docsFilesNames.map(async (fileName) => {
    await prependImport(`${docsPath}/${fileName}`, docsText, themeName, null, 'variables', 'YOUR_THEME_NAME')
  }))

  // Magento checkout styles
  await addFilesFromDir(MAGENTO_CHECKOUT_DIR, themeName, '_', '/Magento_Checkout/styles')

  // Theme level styles
  await addFilesFromDir(ALPACA_STYLES_DIR, themeName, 'email|gallery', '/styles')

  // Component variables
  await addFilesFromTemplate('../templates/components/base', `${BASE_PATH}${themeName}/Snowdog_Components/components/Atoms/variables`)
}

// Exemplary styles to extend button
export async function addExemplaryFiles(themeName) {
  await addFilesFromTemplate('../templates/components/exemplary', `${BASE_PATH}${themeName}/Snowdog_Components/components/Molecules/button`)
  await rename(`${BASE_PATH}${themeName}/Snowdog_Components/components/Molecules/button/button.scss`, `${BASE_PATH}${themeName}/Snowdog_Components/components/Molecules/button/_${themeName}-button.scss`)
  await rename(`${BASE_PATH}${themeName}/Snowdog_Components/components/Molecules/button/button-variables.scss`, `${BASE_PATH}${themeName}/Snowdog_Components/components/Molecules/button/_${themeName}-button-variables.scss`)

  await addFilesFromDir(ALPACA_COMPONENTS_STYLES_DIR, themeName, 'mixins|-extends|_checkout', '/Snowdog_Components/components/styles')
}

// TODO 
// add variables imports
// add theme name to file nammes
// add -extends to imports