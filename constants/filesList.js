/*
  IN THIS FILE SPECIFY DETAILED ARRAY OF FILES
  THAT ARE TO BE INCLUDED IN CHILD THEME

  PROVIDE TEMPLATE PATHS ONLY IN UTILS/CONSTANTS.JS
*/

import {
  TEMPLATE_PATHS,
  // LOCAL_ENV_PATHS,
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
  // {
  //   name: 'checkout.scss',
  //   templateFilePath: TEMPLATE_PATHS.DOCS_CHECKOUT_SCSS,
  //   childFileDestination: '/Snowdog_Components/docs/styles/',
  //   replacePhrase: true,
  //   phraseToReplace: 'YOUR_THEME_NAME',
  //   useSampleTemplate: false,
  //   addThemeNameToFileName: false,
  //   prependedImport: VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.DOCS
  // },
  // {
  //   name: 'styles.scss',
  //   templateFilePath: TEMPLATE_PATHS.DOCS_STYLES_SCSS,
  //   childFileDestination: '/Snowdog_Components/docs/styles/',
  //   replacePhrase: true,
  //   phraseToReplace: 'YOUR_THEME_NAME',
  //   useSampleTemplate: false,
  //   addThemeNameToFileName: false,
  //   prependedImport: VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.DOCS
  // },
  // {
  //   name: 'checkout.scss',
  //   templateFilePath: TEMPLATE_PATHS.MAGENTO_CHECKOUT_SCSS,
  //   childFileDestination: '/Magento_Checkout/styles/',
  //   replacePhrase: true,
  //   phraseToReplace: 'YOUR_THEME_NAME',
  //   useSampleTemplate: false,
  //   addThemeNameToFileName: false,
  //   prependedImport: VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.CHECKOUT
  // },
  // {
  //   name: 'critical.scss',
  //   templateFilePath: TEMPLATE_PATHS.CRITICAL_STYLES,
  //   childFileDestination: '/styles/',
  //   replacePhrase: true,
  //   phraseToReplace: 'YOUR_THEME_NAME',
  //   useSampleTemplate: false,
  //   addThemeNameToFileName: false,
  //   prependedImport: VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.MAIN
  // },
  // {
  //   name: 'styles.scss',
  //   templateFilePath: TEMPLATE_PATHS.THEME_STYLES,
  //   childFileDestination: '/styles/',
  //   replacePhrase: true,
  //   phraseToReplace: 'YOUR_THEME_NAME',
  //   useSampleTemplate: false,
  //   addThemeNameToFileName: false,
  //   prependedImport: VARIABLES_IMPORT_PATHS.COMMENT + VARIABLES_IMPORT_PATHS.MAIN
  // },
  // {
  //   name: 'variables.scss',
  //   templateFilePath: TEMPLATE_PATHS.THEME_VARIABLES,
  //   childFileDestination: '/Snowdog_Components/components/Atoms/variables/',
  //   replacePhrase: false,
  //   phraseToReplace: '',
  //   useSampleTemplate: true,
  //   addThemeNameToFileName: true,
  //   prependedImport: null
  // }
]

export const exemplaryComponent = [
  // {
  //   name: '_button-extend.scss',
  //   templateFilePath: TEMPLATE_PATHS.EXEMPLARY_COMPONENT,
  //   childFileDestination: '/Snowdog_Components/components/Molecules/button/',
  //   replacePhrase: true,
  //   phraseToReplace: 'themeName',
  //   useSampleTemplate: true,
  //   addThemeNameToFileName: false,
  //   prependedImport: null
  // },
  // {
  //   name: 'button-variables.scss',
  //   templateFilePath: TEMPLATE_PATHS.EXEMPLARY_VARIABLES,
  //   childFileDestination: '/Snowdog_Components/components/Molecules/button/',
  //   replacePhrase: false,
  //   phraseToReplace: '',
  //   useSampleTemplate: true,
  //   addThemeNameToFileName: true,
  //   prependedImport: null
  // },
  // {
  //   name: 'button.scss',
  //   templateFilePath: TEMPLATE_PATHS.EXEMPLARY_STYLES,
  //   childFileDestination: '/Snowdog_Components/components/Molecules/button/',
  //   replacePhrase: false,
  //   phraseToReplace: '',
  //   useSampleTemplate: true,
  //   addThemeNameToFileName: true,
  //   prependedImport: null
  // },
  // {
  //   name: '_critical.scss',
  //   templateFilePath: TEMPLATE_PATHS.COMPONENTS_CRITICAL,
  //   childFileDestination: '/Snowdog_Components/components/styles/',
  //   replacePhrase: true,
  //   phraseToReplace: '../Molecules/button/button',
  //   useSampleTemplate: false,
  //   addThemeNameToFileName: false,
  //   prependedImport: null,
  //   replaceWith: '../Molecules/button/button-extend'
  // },
  // {
  //   name: '_critical-checkout.scss',
  //   templateFilePath: TEMPLATE_PATHS.COMPONENTS_CRITICAL_CHECKOUT,
  //   childFileDestination: '/Snowdog_Components/components/styles/',
  //   replacePhrase: true,
  //   phraseToReplace: '../Molecules/button/button',
  //   useSampleTemplate: false,
  //   addThemeNameToFileName: false,
  //   prependedImport: null,
  //   replaceWith: '../Molecules/button/button-extend'
  // },
  // {
  //   name: '_non-critical.scss',
  //   templateFilePath: TEMPLATE_PATHS.COMPONENTS_NON_CRITICAL,
  //   childFileDestination: '/Snowdog_Components/components/styles/',
  //   replacePhrase: false,
  //   phraseToReplace: '',
  //   useSampleTemplate: false,
  //   addThemeNameToFileName: false,
  //   prependedImport: null
  // }
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
