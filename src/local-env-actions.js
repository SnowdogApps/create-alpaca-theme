import { rename } from 'fs/promises'
import { listFiles } from './utils/fileSystem.js'
import {
  VARIABLES_IMPORT_PATHS,
  ENV_PATH,
  SNOWDOG_COMPONENTS,
  ALPACA_THEME_DIR,
  BASE_PATH,
  MAGENTO_CHECKOUT_STYLES
} from './constants/constants.js'
import {
  addFilesFromDir,
  addFilesFromTemplate,
  replacePhraseInAll,
  prependImport
} from './local-env-helper.js'

// SETING UP SNOWDOG_COMPONENTS CONFIG FILES
export async function setupComponentsConfigFiles(themeName, fullThemeName) {
  const componentFilesToUpdate = [
    {
      name: 'gulpfile.mjs',
      phraseToReplace: 'Alpaca',
      phraseToReplaceWith: fullThemeName
    },
    {
      name: 'package.json',
      phraseToReplace: 'alpaca-components',
      phraseToReplaceWith: themeName
    }
  ]
  try {
    await addFilesFromDir(ENV_PATH.ALPACA_COMPONENTS_DIR, themeName, '.lock|.md', SNOWDOG_COMPONENTS)
    await addFilesFromTemplate(ENV_PATH.TEMPLATES_COMPONENTS_CONFIG_DIR, `${BASE_PATH}${themeName}${SNOWDOG_COMPONENTS}`)
    await replacePhraseInAll(componentFilesToUpdate, `${BASE_PATH}${themeName}${SNOWDOG_COMPONENTS}`)
  } catch (error) {
    console.log(`\n${error}`)
  }
}

// SETTING UP THEME LEVEL BASE CONFIG FILES
export async function setupThemeConfigFiles(themeName, fullThemeName) {
  const lineToAddParentTag = 2
  const parentTag = '    <parent>Snowdog/alpaca</parent>'
  const ignoredFiles = '.lock|.md|now|LICENSE|composer'
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
    },
    {
      name: 'README.md',
      phraseToReplace: 'YOUR_THEME_NAME',
      phraseToReplaceWith: fullThemeName
    }
  ]

  await addFilesFromDir(ALPACA_THEME_DIR, themeName, ignoredFiles)
  await addFilesFromTemplate(ENV_PATH.TEMPLATES_THEME_DIR, `${BASE_PATH}${themeName}`)
  await replacePhraseInAll(themeFilesToUpdate, `${BASE_PATH}${themeName}`)
  await prependImport(
    `${BASE_PATH}${themeName}/theme.xml`,
    parentTag,
    themeName,
    lineToAddParentTag
  )
}

// CONFIGURING FRONTOOLS
export async function setupFrontoolsConfigFiles(themeName) {
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

  await addFilesFromTemplate(ENV_PATH.TEMPLATES_FRONTOOLS_DIR, ENV_PATH.DEV_FRONTOOLS_CONFIG_DIR)
  await replacePhraseInAll(frontoolsFilesToUpdate, ENV_PATH.DEV_FRONTOOLS_CONFIG_DIR)
}

// ADDING ALPACA BASE STYLES
export async function addBaseStyles(themeName) {
  const docsPath = `${BASE_PATH}${themeName}${ENV_PATH.COMPONENT_DOCS_STYLES_DIR}`
  const docsText = VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.DOCS
  const chechoutPath = `${BASE_PATH}${themeName}${MAGENTO_CHECKOUT_STYLES}/checkout.scss`
  const checkoutText = VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.CHECKOUT
  const themeLevelStylesPath = `${BASE_PATH}${themeName}/styles`
  const themeLevelStylesText = VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.MAIN

  // CREATING CHILD THEME VARIABLES
  await addFilesFromTemplate(
    ENV_PATH.TEMPLATES_COMPONENTS_BASE_DIR,
    `${BASE_PATH}${themeName}${ENV_PATH.COMPONENT_VARIABLES_DIR}`
  )
  await rename(
    `${BASE_PATH}${themeName}${ENV_PATH.COMPONENT_VARIABLES_FILE}`,
    `${BASE_PATH}${themeName}${ENV_PATH.COMPONENT_VARIABLES_DIR}/_${themeName}-variables.scss`
  )

  // IMPORTING ALPACA COMPONENTS DOCS STYLES
  await addFilesFromDir(ENV_PATH.ALPACA_COMPONENTS_DOCS_STYLES_DIR, themeName, '_', ENV_PATH.COMPONENT_DOCS_STYLES_DIR)

  const docsFilesNames = await listFiles(docsPath)

  docsFilesNames.forEach((fileName) => {
    prependImport(`${docsPath}/${fileName}`, docsText, themeName, null, 'variables', 'YOUR_THEME_NAME')
  })

  // IMPORTING MAGENTO CHECKOUT STYLES
  await addFilesFromDir(ENV_PATH.ALPACA_MAGENTO_CHECKOUT_STYLES_DIR, themeName, null, MAGENTO_CHECKOUT_STYLES)
  await prependImport(chechoutPath, checkoutText, themeName, null, 'variables', 'YOUR_THEME_NAME')

  // CREATING THEME LEVEL STYLES
  await addFilesFromDir(ENV_PATH.ALPACA_STYLES_DIR, themeName, null, '/styles')

  const themeLevelStyles = await listFiles(themeLevelStylesPath)

  themeLevelStyles.forEach((fileName) => {
    prependImport(
      `${themeLevelStylesPath}/${fileName}`,
      themeLevelStylesText,
      themeName,
      null,
      'variables',
      'YOUR_THEME_NAME'
    )
  })
}

// ADDING EXEMPLARY BUTTON STYLES AND CRITICAL/NON-CRITICAL IMPORTS
export async function addExemplaryStyles(themeName) {
  const exemplaryFilesToUpdate = [
    {
      name: '_button-extend.scss',
      phraseToReplace: 'themeName',
      phraseToReplaceWith: themeName
    }
  ]

  const criticalStylesToUpdate = [
    {
      name: '_critical.scss',
      phraseToReplace: '../Molecules/button/button',
      phraseToReplaceWith: '../Molecules/button/button-extend'
    },
    {
      name: '_critical-checkout.scss',
      phraseToReplace: '../Molecules/button/button',
      phraseToReplaceWith: '../Molecules/button/button-extend'
    }
  ]

  // ADDING BUTTON STYLES
  await addFilesFromTemplate(
    ENV_PATH.TEMPLATES_COMPONENTS_EXEMPLARY_DIR,
    `${BASE_PATH}${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button`
  )
  await replacePhraseInAll(exemplaryFilesToUpdate, `${BASE_PATH}${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button`)
  await rename(
    `${BASE_PATH}${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button/button.scss`,
    `${BASE_PATH}${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button/_${themeName}-button.scss`
  )
  await rename(
    `${BASE_PATH}${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button/button-variables.scss`,
    `${BASE_PATH}${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button/_${themeName}-button-variables.scss`
  )

  // IMPORTING CRITICAL AND NON CRITICAL STYLES
  await addFilesFromDir(
    ENV_PATH.ALPACA_COMPONENTS_STYLES_DIR,
    themeName,
    'mixins|-extends|_checkout',
    ENV_PATH.SNOWDOG_COMPONENTS_STYLES_DIR
  )
  await replacePhraseInAll(criticalStylesToUpdate, `${BASE_PATH}${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_STYLES_DIR}`)
}
