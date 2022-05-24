import { rename } from 'fs/promises'
import { listFiles } from './utils/fileSystem.js'
import {
  VARIABLES_IMPORT_PATHS,
  ENV_PATH,
  SNOWDOG_COMPONENTS,
  ALPACA_THEME_DIR,
  BASE_THEME_PATH,
  MAGENTO_CHECKOUT_STYLES
} from './constants/constants.js'
import {
  addFilesFromDir,
  addFilesFromTemplate,
  replacePhraseInAll,
  prependImport,
  replacePhrase
} from './local-env-helper.js'

// SETING UP SNOWDOG_COMPONENTS CONFIG FILES
export async function setupComponentsConfigFiles(themeName, fullThemeName, vendor) {
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
    await addFilesFromDir(ENV_PATH.ALPACA_COMPONENTS_DIR, themeName, '.lock|.md', vendor, SNOWDOG_COMPONENTS)
    await addFilesFromTemplate(ENV_PATH.TEMPLATES_COMPONENTS_CONFIG_DIR, `${BASE_THEME_PATH}${vendor}/${themeName}${SNOWDOG_COMPONENTS}`)
    await replacePhraseInAll(componentFilesToUpdate, `${BASE_THEME_PATH}${vendor}/${themeName}${SNOWDOG_COMPONENTS}`)
  } catch (error) {
    console.log(`\n${error}`)
  }
}

// SETTING UP THEME LEVEL BASE CONFIG FILES
export async function setupThemeConfigFiles(themeName, fullThemeName, vendor) {
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

  await addFilesFromDir(ALPACA_THEME_DIR, themeName, ignoredFiles, vendor)
  await addFilesFromTemplate(ENV_PATH.TEMPLATES_THEME_DIR, `${BASE_THEME_PATH}${vendor}/${themeName}`)
  await replacePhraseInAll(themeFilesToUpdate, `${BASE_THEME_PATH}${vendor}/${themeName}`)
  await replacePhrase(`${BASE_THEME_PATH}${vendor}/${themeName}/registration.php`, 'Snowdog', vendor)
  await prependImport(
    `${BASE_THEME_PATH}${vendor}/${themeName}/theme.xml`,
    parentTag,
    themeName,
    lineToAddParentTag
  )
}

// CONFIGURING FRONTOOLS
export async function setupFrontoolsConfigFiles(themeName, vendor) {
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
  await replacePhrase(`${ENV_PATH.DEV_FRONTOOLS_CONFIG_DIR}/themes.json`, 'YOUR_VENDOR', vendor)
}

// ADDING ALPACA BASE STYLES
export async function addBaseStyles(themeName, vendor) {
  const docsPath = `${BASE_THEME_PATH}${vendor}/${themeName}${ENV_PATH.COMPONENT_DOCS_STYLES_DIR}`
  const docsText = VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.DOCS
  const chechoutPath = `${BASE_THEME_PATH}${vendor}/${themeName}${MAGENTO_CHECKOUT_STYLES}/checkout.scss`
  const checkoutText = VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.CHECKOUT
  const themeLevelStylesPath = `${BASE_THEME_PATH}${vendor}/${themeName}/styles`
  const themeLevelStylesText = VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.MAIN

  // CREATING CHILD THEME VARIABLES
  await addFilesFromTemplate(
    ENV_PATH.TEMPLATES_COMPONENTS_BASE_DIR,
    `${BASE_THEME_PATH}${vendor}/${themeName}${ENV_PATH.COMPONENT_VARIABLES_DIR}`
  )
  await rename(
    `${BASE_THEME_PATH}${vendor}/${themeName}${ENV_PATH.COMPONENT_VARIABLES_FILE}`,
    `${BASE_THEME_PATH}${vendor}/${themeName}${ENV_PATH.COMPONENT_VARIABLES_DIR}/_${themeName}-variables.scss`
  )

  // IMPORTING ALPACA COMPONENTS DOCS STYLES
  await addFilesFromDir(ENV_PATH.ALPACA_COMPONENTS_DOCS_STYLES_DIR, themeName, '_', vendor, ENV_PATH.COMPONENT_DOCS_STYLES_DIR)

  const docsFilesNames = await listFiles(docsPath)

  docsFilesNames.forEach((fileName) => {
    prependImport(`${docsPath}/${fileName}`, docsText, themeName, 0, null, 'YOUR_THEME_NAME')
  })

  // IMPORTING MAGENTO CHECKOUT STYLES
  await addFilesFromDir(ENV_PATH.ALPACA_MAGENTO_CHECKOUT_STYLES_DIR, themeName, null, vendor, MAGENTO_CHECKOUT_STYLES)
  await prependImport(chechoutPath, checkoutText, themeName, 0, null, 'YOUR_THEME_NAME')

  // CREATING THEME LEVEL STYLES
  await addFilesFromDir(ENV_PATH.ALPACA_STYLES_DIR, themeName, null, vendor, '/styles')

  const themeLevelStyles = await listFiles(themeLevelStylesPath)

  themeLevelStyles.forEach((fileName) => {
    prependImport(
      `${themeLevelStylesPath}/${fileName}`,
      themeLevelStylesText,
      themeName,
      0,
      null,
      'YOUR_THEME_NAME'
    )
  })
}

// ADDING EXEMPLARY BUTTON STYLES AND CRITICAL/NON-CRITICAL IMPORTS
export async function addExemplaryStyles(themeName, vendor) {
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
    `${BASE_THEME_PATH}${vendor}/${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button`
  )
  await replacePhraseInAll(exemplaryFilesToUpdate, `${BASE_THEME_PATH}${vendor}/${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button`)
  await rename(
    `${BASE_THEME_PATH}${vendor}/${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button/button.scss`,
    `${BASE_THEME_PATH}${vendor}/${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button/_${themeName}-button.scss`
  )
  await rename(
    `${BASE_THEME_PATH}${vendor}/${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button/button-variables.scss`,
    `${BASE_THEME_PATH}${vendor}/${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button/_${themeName}-button-variables.scss`
  )

  // IMPORTING CRITICAL AND NON CRITICAL STYLES
  await addFilesFromDir(
    ENV_PATH.ALPACA_COMPONENTS_STYLES_DIR,
    themeName,
    'mixins|-extends|_checkout',
    vendor,
    ENV_PATH.SNOWDOG_COMPONENTS_STYLES_DIR
  )
  await replacePhraseInAll(criticalStylesToUpdate, `${BASE_THEME_PATH}${vendor}/${themeName}${ENV_PATH.SNOWDOG_COMPONENTS_STYLES_DIR}`)
}
