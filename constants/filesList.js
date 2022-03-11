/*
  IN THIS FILE SPECIFY DETAILED ARRAY OF FILES
  THAT ARE TO BE INCLUDED IN CHILD THEME

  PROVIDE TEMPLATE PATHS ONLY IN UTILS/CONSTANTS.JS
*/

import {
  TEMPLATE_PATHS,
  LOCAL_ENV_PATHS,
  VARIABLES_IMPORT_PATHS,
  MEDIA_PATHS
} from './constants.js'

/*
  TEMPLATE FILES FORMAT - ARRAY OF OBJECTS CONTAINING:
  {
    name: FAILE NAME (STRING)
    templateFilePath: TEMPLATE PATH LOCATED IN UTILS/CONSTANTS (STRING PATH)
    childFileDestination: DESTINATION PATH OF FILE LOCATION (STRING PATH)
    replacePhrase: SHOULD REPLACE ALL PHRASE OCCURANCES IN FILE? (TRUE/FALSE)
    phraseToReplace: PHRASE TO BE REPLACED (STRING)
    useSampleTemplate: IF USING TEMPLATE LOCATED IN /TEMPLATES FOLDER SET TRUE (TRUE/FALSE)
    addThemeNameToFileName: SHOULD ADD THEME NAME AT BEGINNING OF FILE NAME? (TRUE/FALSE)
    prependedImport: IMPORT CHILD THEME VARIABLES (STRING/NULL)
    replaceWith: IF REQUESTED TO REPLACE PHRASE - NEW PHRASE (STRING) | OPTIONAL
  }
*/

export const templateFiles = [
  {
    name: '.browserslistrc',
    templateFilePath: TEMPLATE_PATHS.BROWSER_LIST_RC,
    childFileDestination: '/Snowdog_Components/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: '.editorconfig',
    templateFilePath: TEMPLATE_PATHS.EDITOR_CONFIG,
    childFileDestination: '/Snowdog_Components/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: '.eslintignore',
    templateFilePath: TEMPLATE_PATHS.ESLINT_IGNORE,
    childFileDestination: '/Snowdog_Components/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: '.eslintrc.json',
    templateFilePath: TEMPLATE_PATHS.ESLINT_RC,
    childFileDestination: '/Snowdog_Components/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: '.node-version',
    templateFilePath: TEMPLATE_PATHS.NODE_VERSIONS,
    childFileDestination: '/Snowdog_Components/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false
  },
  {
    name: '.sass-lint.yml',
    templateFilePath: TEMPLATE_PATHS.SASS_LINT,
    childFileDestination: '/Snowdog_Components/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: '.stylelintrc',
    templateFilePath: TEMPLATE_PATHS.STYLE_LINT_RC,
    childFileDestination: '/Snowdog_Components/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: 'gulpfile.mjs',
    templateFilePath: TEMPLATE_PATHS.GULPFILE,
    childFileDestination: '/Snowdog_Components/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: 'package.json',
    templateFilePath: TEMPLATE_PATHS.PACKAGE_JSON,
    childFileDestination: '/Snowdog_Components/',
    replacePhrase: true,
    phraseToReplace: 'alpaca-components',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: 'modules.mjs',
    templateFilePath: TEMPLATE_PATHS.MODULES_MJS,
    childFileDestination: '/Snowdog_Components/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: true,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: 'checkout.scss',
    templateFilePath: TEMPLATE_PATHS.DOCS_CHECKOUT_SCSS,
    childFileDestination: '/Snowdog_Components/docs/styles/',
    replacePhrase: true,
    phraseToReplace: 'YOUR_THEME_NAME',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.DOCS
  },
  {
    name: 'styles.scss',
    templateFilePath: TEMPLATE_PATHS.DOCS_STYLES_SCSS,
    childFileDestination: '/Snowdog_Components/docs/styles/',
    replacePhrase: true,
    phraseToReplace: 'YOUR_THEME_NAME',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.DOCS
  },
  {
    name: 'checkout.scss',
    templateFilePath: TEMPLATE_PATHS.MAGENTO_CHECKOUT_SCSS,
    childFileDestination: '/Magento_Checkout/styles/',
    replacePhrase: true,
    phraseToReplace: 'YOUR_THEME_NAME',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.CHECKOUT
  },
  {
    name: 'critical.scss',
    templateFilePath: TEMPLATE_PATHS.CRITICAL_STYLES,
    childFileDestination: '/styles/',
    replacePhrase: true,
    phraseToReplace: 'YOUR_THEME_NAME',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.MAIN
  },
  {
    name: 'styles.scss',
    templateFilePath: TEMPLATE_PATHS.THEME_STYLES,
    childFileDestination: '/styles/',
    replacePhrase: true,
    phraseToReplace: 'YOUR_THEME_NAME',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.MAIN
  },
  {
    name: 'theme.xml',
    templateFilePath: TEMPLATE_PATHS.THEME_XML,
    childFileDestination: '/',
    replacePhrase: true,
    phraseToReplace: 'YOUR_THEME_NAME',
    useSampleTemplate: true,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: 'registration.php',
    templateFilePath: TEMPLATE_PATHS.REGISTRATION,
    childFileDestination: '/',
    replacePhrase: true,
    phraseToReplace: 'YOUR_THEME_NAME',
    useSampleTemplate: true,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: '.gitignore',
    templateFilePath: TEMPLATE_PATHS.GITIGNORE,
    childFileDestination: '/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: false,
    prependedImport: null
  },
  {
    name: 'README.md',
    templateFilePath: TEMPLATE_PATHS.README,
    childFileDestination: '/',
    replacePhrase: true,
    phraseToReplace: 'YOUR_THEME_NAME',
    useSampleTemplate: true,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: 'CHANGELOG.md',
    templateFilePath: TEMPLATE_PATHS.CHANGELOG,
    childFileDestination: '/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: true,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: 'themes.json',
    templateFilePath: TEMPLATE_PATHS.THEMES_JSON,
    childFileDestination: LOCAL_ENV_PATHS.THEMES_JSON,
    replacePhrase: true,
    phraseToReplace: 'YOUR_THEME_NAME',
    useSampleTemplate: true,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: 'browser-sync.json',
    templateFilePath: TEMPLATE_PATHS.BROWSER_SYNC,
    childFileDestination: LOCAL_ENV_PATHS.BROWSER_SYNC,
    replacePhrase: true,
    phraseToReplace: 'YOUR_THEME_NAME',
    useSampleTemplate: true,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: 'variables.scss',
    templateFilePath: TEMPLATE_PATHS.THEME_VARIABLES,
    childFileDestination: '/Snowdog_Components/components/Atoms/variables/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: false,
    addThemeNameToFileName: true,
    prependedImport: null
  }
]

export const exemplaryComponent = [
  {
    name: '_button-extend.scss',
    templateFilePath: TEMPLATE_PATHS.EXEMPLARY_COMPONENT,
    childFileDestination: '/Snowdog_Components/components/Molecules/button/',
    replacePhrase: true,
    phraseToReplace: 'themeName',
    useSampleTemplate: true,
    addThemeNameToFileName: false,
    prependedImport: null
  },
  {
    name: 'button-variables.scss',
    templateFilePath: TEMPLATE_PATHS.EMPTY,
    childFileDestination: '/Snowdog_Components/components/Molecules/button/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: true,
    addThemeNameToFileName: true,
    prependedImport: null
  },
  {
    name: 'button.scss',
    templateFilePath: TEMPLATE_PATHS.EMPTY,
    childFileDestination: '/Snowdog_Components/components/Molecules/button/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: true,
    addThemeNameToFileName: true,
    prependedImport: null
  },
  {
    name: '_critical.scss',
    templateFilePath: TEMPLATE_PATHS.COMPONENTS_CRITICAL,
    childFileDestination: '/Snowdog_Components/components/styles/',
    replacePhrase: true,
    phraseToReplace: '../Molecules/button/button',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: null,
    replaceWith: '../Molecules/button/button-extend'
  },
  {
    name: '_non-critical.scss',
    templateFilePath: TEMPLATE_PATHS.COMPONENTS_NON_CRITICAL,
    childFileDestination: '/Snowdog_Components/components/styles/',
    replacePhrase: false,
    phraseToReplace: '',
    useSampleTemplate: false,
    addThemeNameToFileName: false,
    prependedImport: null
  }
]

// HOMEPAGE IMAGES
export const templateMedia = [
  {
    imgTemplatePath: MEDIA_PATHS.BANNER_MED_MEN,
    localImgPath: MEDIA_PATHS.LOCAL_BANNER_MED_MEN
  },
  {
    imgTemplatePath: MEDIA_PATHS.BANNER_MED_WOMEN,
    localImgPath: MEDIA_PATHS.LOCAL_BANNER_MED_WOMEN
  },
  {
    imgTemplatePath: MEDIA_PATHS.CATEGORY_ACCERSORES_144,
    localImgPath: MEDIA_PATHS.LOCAL_CATEGORY_ACCERSORES_144
  },
  {
    imgTemplatePath: MEDIA_PATHS.CATEGORY_ACCERSORES_320,
    localImgPath: MEDIA_PATHS.LOCAL_CATEGORY_ACCERSORES_320
  },
  {
    imgTemplatePath: MEDIA_PATHS.CATEGORY_CLOTHING_144,
    localImgPath: MEDIA_PATHS.LOCAL_CATEGORY_CLOTHING_144
  },
  {
    imgTemplatePath: MEDIA_PATHS.CATEGORY_CLOTHING_320,
    localImgPath: MEDIA_PATHS.LOCAL_CATEGORY_CLOTHING_320
  },
  {
    imgTemplatePath: MEDIA_PATHS.CATEGORY_NEW_144,
    localImgPath: MEDIA_PATHS.LOCAL_CATEGORY_NEW_144
  },
  {
    imgTemplatePath: MEDIA_PATHS.CATEGORY_NEW_320,
    localImgPath: MEDIA_PATHS.LOCAL_CATEGORY_NEW_320
  },
  {
    imgTemplatePath: MEDIA_PATHS.CATEGORY_SHOES_144,
    localImgPath: MEDIA_PATHS.LOCAL_CATEGORY_SHOES_144
  },
  {
    imgTemplatePath: MEDIA_PATHS.CATEGORY_SHOES_320,
    localImgPath: MEDIA_PATHS.LOCAL_CATEGORY_SHOES_320
  },
  {
    imgTemplatePath: MEDIA_PATHS.TEASER_SMALL,
    localImgPath: MEDIA_PATHS.LOCAL_TEASER_SMALL
  },
  {
    imgTemplatePath: MEDIA_PATHS.TEASER_MEDIUM_376,
    localImgPath: MEDIA_PATHS.LOCAL_TEASER_MEDIUM_376
  },
  {
    imgTemplatePath: MEDIA_PATHS.TEASER_MEDIUM_472,
    localImgPath: MEDIA_PATHS.LOCAL_TEASER_MEDIUM_472
  },
  {
    imgTemplatePath: MEDIA_PATHS.TEASER_LARGE,
    localImgPath: MEDIA_PATHS.LOCAL_TEASER_LARGE
  }
]
