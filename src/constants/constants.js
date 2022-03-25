import colors from 'colors'

// GLOBAL CONSTANTS
export const CHECK_MARK_CHARACTER = '\u2713'

// COMPOSER PACKAGES NAMES
export const PACKAGE_PATH = {
  ALPACA_PACKAGES: 'snowdog/module-alpaca-packages --no-interaction',
  THEME_FRONTEND_ALPACA: 'snowdog/theme-frontend-alpaca "^2.26" --no-interaction', // CLI WORKS ONLY WITH ^2.26.0
  FRONTOOLS: 'snowdog/frontools'
}

// BASE PATHS
export const BASE_PATH = 'app/design/frontend/Snowdog/'
export const FRONTOOLS_PATH = 'vendor/snowdog/frontools'
export const SNOWDOG_COMPONENTS = '/Snowdog_Components'
export const MAGENTO_CHECKOUT_STYLES = '/Magento_Checkout/styles'
export const ALPACA_THEME_DIR = 'vendor/snowdog/theme-frontend-alpaca'
export const TEMPLATES_DIR = '../templates'
export const ASSETS_DIR = '../assets'
export const ASSETS_IMAGES_DIR = `${ASSETS_DIR}/images`
export const CMS_BANNERS_DIR = 'pub/media/cms/home/banners'
export const CMS_TEASERS_DIR = 'pub/media/cms/home/teasers'

// LOCAL-ENV-ACTIONS PATHS
export const ENV_PATH = {
  SNOWDOG_COMPONENTS_STYLES_DIR: `${SNOWDOG_COMPONENTS}/components/styles`,
  SNOWDOG_COMPONENTS_MOLECULES_DIR: `${SNOWDOG_COMPONENTS}/components/Molecules`,
  COMPONENT_DOCS_STYLES_DIR: `${SNOWDOG_COMPONENTS}/docs/styles`,
  COMPONENT_VARIABLES_DIR: `${SNOWDOG_COMPONENTS}/components/Atoms/variables`,
  COMPONENT_VARIABLES_FILE: `${SNOWDOG_COMPONENTS}/components/Atoms/variables/variables.scss`,
  ALPACA_STYLES_DIR: `${ALPACA_THEME_DIR}/styles`,
  ALPACA_COMPONENTS_DIR: `${ALPACA_THEME_DIR}${SNOWDOG_COMPONENTS}`,
  ALPACA_COMPONENTS_STYLES_DIR: `${ALPACA_THEME_DIR}${SNOWDOG_COMPONENTS}/components/styles`,
  ALPACA_COMPONENTS_DOCS_STYLES_DIR: `${ALPACA_THEME_DIR}${SNOWDOG_COMPONENTS}/docs/styles`,
  ALPACA_MAGENTO_CHECKOUT_STYLES_DIR: `${ALPACA_THEME_DIR}/Magento_Checkout/styles`,
  TEMPLATES_COMPONENTS_CONFIG_DIR: `${TEMPLATES_DIR}/components/config`,
  TEMPLATES_COMPONENTS_BASE_DIR: `${TEMPLATES_DIR}/components/base`,
  TEMPLATES_COMPONENTS_EXEMPLARY_DIR: `${TEMPLATES_DIR}/components/exemplary`,
  TEMPLATES_FRONTOOLS_DIR: `${TEMPLATES_DIR}/frontools`,
  TEMPLATES_THEME_DIR: `${TEMPLATES_DIR}/theme`,
  DEV_FRONTOOLS_CONFIG_DIR: 'dev/tools/frontools/config'
}

// ATOM VARIABALES PATHS TO PREPEND TO FILE
export const VARIABLES_IMPORT_PATHS = {
  COMMENT: '// Child theme variables\n',
  MAIN: '@import "../Snowdog_Components/components/Atoms/variables/YOUR_THEME_NAME-variables";\n',
  DOCS: '@import "../../components/Atoms/variables/YOUR_THEME_NAME-variables";\n',
  CHECKOUT: '@import "../../Snowdog_Components/components/Atoms/variables/YOUR_THEME_NAME-variables";'
}

// PROGRESS BAR
export const LOADING_BAR = {
  FORMAT: `  | ${colors.cyan('{bar}')} | {percentage}% || {info}`,
  COMPLETE_CHAR: '\u2588',
  INCOMPLETE_CHAR: '\u2591',
  SIZE: 30,
  CURSOR_HIDDEN: true
}

// VALIDATORS
export const NAME_NOT_PROVIDED_MSG = 'It cannot be empty. Please provide valid theme name.'
export const NAME_TO_SHORT_MSG = 'Your theme name should be at least 3 characters long.'
export const NAME_MINIMUM_LENGTH = 3
export const REGISTRATION_NAME_NOT_SINGULAR = 'Registration name needs to be one word'
export const BANNED_NAMES_MSG = 'This name is forbidden. Choose diffrent name.'
export const NAME_NOT_LOWERCASE = 'All characters in registration name must be lower case.'
export const BANNED_NAMES_LIST = [
  'alpaca',
  'Alpaca Theme',
  'alpaca-theme',
  'Snowdog',
  'snowdog',
  'SNOW.DOG',
  'Magento',
  'Magento 2',
  'magento',
  'magento 2',
  'Colibri',
  'theme-blank-sass'
]

// PLACEHOLDER IMAGES PATHS
const PLACEHOLDER_654_254 = `${ASSETS_IMAGES_DIR}/placeholder-656_254.jpg`
const PLACEHOLDER_144_200 = `${ASSETS_IMAGES_DIR}/placeholder-144_200.jpg`
const PLACEHOLDER_320_432 = `${ASSETS_IMAGES_DIR}/placeholder-320_432.jpg`
const PLACEHOLDER_304_304 = `${ASSETS_IMAGES_DIR}/placeholder-304_304.jpg`
const PLACEHOLDER_376_432 = `${ASSETS_IMAGES_DIR}/placeholder-376_432.jpg`
const PLACEHOLDER_472_432 = `${ASSETS_IMAGES_DIR}/placeholder-472_432.jpg`
const PLACEHOLDER_1328_1200 = `${ASSETS_IMAGES_DIR}/placeholder_1328-1200.jpg`

// SPECIFY WHICH PLACHOLDER TO USE FOR CMS BLOCK
export const MEDIA_PATHS = [
  { imgTemplatePath: PLACEHOLDER_654_254, localImgPath: `${CMS_BANNERS_DIR}/banner-medium-men-now-656_264.jpg` },
  { imgTemplatePath: PLACEHOLDER_654_254, localImgPath: `${CMS_BANNERS_DIR}/banner-medium-women-now-656_264.jpg` },
  { imgTemplatePath: PLACEHOLDER_144_200, localImgPath: `${CMS_BANNERS_DIR}/category-accessories-144_200.jpg` },
  { imgTemplatePath: PLACEHOLDER_320_432, localImgPath: `${CMS_BANNERS_DIR}/category-accessories-320_432.jpg` },
  { imgTemplatePath: PLACEHOLDER_144_200, localImgPath: `${CMS_BANNERS_DIR}/category-clothing-144_200.jpg` },
  { imgTemplatePath: PLACEHOLDER_320_432, localImgPath: `${CMS_BANNERS_DIR}/category-clothing-320_432.jpg` },
  { imgTemplatePath: PLACEHOLDER_144_200, localImgPath: `${CMS_BANNERS_DIR}/category-new-in-144_200.jpg` },
  { imgTemplatePath: PLACEHOLDER_320_432, localImgPath: `${CMS_BANNERS_DIR}/category-new-in-320_432.jpg` },
  { imgTemplatePath: PLACEHOLDER_144_200, localImgPath: `${CMS_BANNERS_DIR}/category-shoes-144_200.jpg` },
  { imgTemplatePath: PLACEHOLDER_320_432, localImgPath: `${CMS_BANNERS_DIR}/category-shoes-320_432.jpg` },
  { imgTemplatePath: PLACEHOLDER_304_304, localImgPath: `${CMS_TEASERS_DIR}/teaser-small-girl_304-304.jpg` },
  { imgTemplatePath: PLACEHOLDER_376_432, localImgPath: `${CMS_TEASERS_DIR}/teaser-medium-girl_376-432.jpg` },
  { imgTemplatePath: PLACEHOLDER_472_432, localImgPath: `${CMS_TEASERS_DIR}/teaser-medium-girl_472-432.jpg` },
  { imgTemplatePath: PLACEHOLDER_1328_1200, localImgPath: `${CMS_TEASERS_DIR}/teaser-large-girl_1328-1200.jpg` }
]
