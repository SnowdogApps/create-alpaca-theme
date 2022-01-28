/*
  IN THIS FILE SPECIFY DETAILED ARRAY OF FILES
  THAT ARE TO BE INCLUDED IN CHILD THEME

  PROVIDE TEMPLATE PATHS ONLY IN UTILS/CONSTANTS.JS
*/

import {
  TEMPLATE_PATHS,
  LOCAL_ENV_PATHS
} from '../utils/constants.js'

export const templateFiles = [
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
