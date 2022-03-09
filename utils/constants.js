import colors from 'colors'

// GLOBAL CONSTANTS
export const CHECK_MARK_CHARACTER = '\u2713'

// COMPOSER PACLAGES NAMES
export const PACKAGE_PATH = {
  /* TEMP - DELETE LINE BELOW AFTER FEATURE/PERFORMANCE RELEASE */
  THEME_FRONTEND_ALPACA_TEST: 'snowdog/theme-frontend-alpaca:dev-test',

  ALPACA_PACKAGES: 'snowdog/module-alpaca-packages',
  FRONTOOLS: 'snowdog/frontools'
}

// BASE PATHS
export const BASE_PATH = 'app/design/frontend/Snowdog/'
export const FRONTOOLS_PATH = 'vendor/snowdog/frontools'

// TEMPLATE FILES PATHS
export const TEMPLATE_PATHS = {
  BROWSER_SYNC: '../templates/frontools/browser-sync.json.sample',
  REGISTRATION: '../templates/theme/registration.php.sample',
  THEME_XML: '../templates/theme/theme.xml.sample',
  THEMES_JSON: '../templates/frontools/themes.json.sample',
  EDITOR_CONFIG: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/.editorconfig',
  ESLINT_IGNORE: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/.eslintignore',
  ESLINT_RC: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/.eslintrc.json',
  NODE_VERSIONS: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/.node-version',
  SASS_LINT: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/.sass-lint.yml',
  STYLE_LINT_RC: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/.stylelintrc',
  GULPFILE: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/gulpfile.mjs',
  MODULES_MJS: '../templates/components/modules.mjs.sample',
  PACKAGE_JSON: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/package.json',
  DOCS_CHECKOUT_SCSS: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/docs/styles/checkout.scss',
  DOCS_STYLES_SCSS: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/docs/styles/styles.scss',
  MAGENTO_CHECKOUT_SCSS: 'vendor/snowdog/theme-frontend-alpaca/Magento_Checkout/styles/checkout.scss',
  THEME_VARIABLES: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/components/Atoms/variables/_variables.scss',
  THEME_STYLES: 'vendor/snowdog/theme-frontend-alpaca/styles/styles.scss',
  CRITICAL_STYLES: 'vendor/snowdog/theme-frontend-alpaca/styles/critical.scss',
  README: '../templates/theme/README.md.sample',
  CHANGELOG: '../templates/theme/CHANGELOG.md.sample',
  GITIGNORE: 'vendor/snowdog/theme-frontend-alpaca/.gitignore',
  BROWSER_LIST_RC: 'vendor/snowdog/theme-frontend-alpaca/Snowdog_Components/.browserslistrc'
}

// LOCAL ENVIRONMENT PATHS
export const LOCAL_ENV_PATHS = {
  BROWSER_SYNC: 'dev/tools/frontools/config/browser-sync.json',
  THEMES_JSON: 'dev/tools/frontools/config/themes.json'
}

// ATOM VARIABALES PATHS
export const VARIABLES_IMPORT_PATHS = {
  COMMENT: '// Child theme variables\n',
  MAIN: '@import "../Snowdog_Components/components/Atoms/variables/YOUR_THEME_NAME-variables";\n\n',
  DOCS: '@import "../../components/Atoms/variables/YOUR_THEME_NAME-variables";\n\n',
  CHECKOUT: '@import "../../Snowdog_Components/components/Atoms/variables/YOUR_THEME_NAME-variables";\n\n'
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
export const NOT_MAGENTO_MSG_TOP = 'This directory is not valid Magento instance.'
export const NOT_MAGENTO_MSG_BOTTOM = 'Try again from Magento project root directory.'
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

export const MEDIA_PATHS = {
  BANNER_MED_MEN: '../templates/images/banners/banner-medium-men-now-656_264.jpg',
  BANNER_MED_WOMEN: '../templates/images/banners/banner-medium-women-now-656_264.jpg',
  CATEGORY_ACCERSORES_144: '../templates/images/banners/category-accessories-144_200.jpg',
  CATEGORY_ACCERSORES_320: '../templates/images/banners/category-accessories-320_432.jpg',
  CATEGORY_CLOTHING_144: '../templates/images/banners/category-clothing-144_200.jpg',
  CATEGORY_CLOTHING_320: '../templates/images/banners/category-clothing-320_432.jpg',
  CATEGORY_NEW_144: '../templates/images/banners/category-new-in-144_200.jpg',
  CATEGORY_NEW_320: '../templates/images/banners/category-new-in-320_432.jpg',
  CATEGORY_SHOES_144: '../templates/images/banners/category-shoes-144_200.jpg',
  CATEGORY_SHOES_320: '../templates/images/banners/category-shoes-320_432.jpg',
  TEASER_SMALL: '../templates/images/teasers/teaser-small-girl_304-304.jpg',
  TEASER_MEDIUM_376: '../templates/images/teasers/teaser-medium-girl_376-432.jpg',
  TEASER_MEDIUM_472: '../templates/images/teasers/teaser-medium-girl_472-432.jpg',
  TEASER_LARGE: '../templates/images/teasers/teaser-large-girl_1328-1200.jpg',
  LOCAL_BANNER_MED_MEN: 'pub/media/cms/home/banners/banner-medium-men-now-656_264.jpg',
  LOCAL_BANNER_MED_WOMEN: 'pub/media/cms/home/banners/banner-medium-women-now-656_264.jpg',
  LOCAL_CATEGORY_ACCERSORES_144: 'pub/media/cms/home/banners/category-accessories-144_200.jpg',
  LOCAL_CATEGORY_ACCERSORES_320: 'pub/media/cms/home/banners/category-accessories-320_432.jpg',
  LOCAL_CATEGORY_CLOTHING_144: 'pub/media/cms/home/banners/category-clothing-144_200.jpg',
  LOCAL_CATEGORY_CLOTHING_320: 'pub/media/cms/home/banners/category-clothing-320_432.jpg',
  LOCAL_CATEGORY_NEW_144: 'pub/media/cms/home/banners/category-new-in-144_200.jpg',
  LOCAL_CATEGORY_NEW_320: 'pub/media/cms/home/banners/category-new-in-320_432.jpg',
  LOCAL_CATEGORY_SHOES_144: 'pub/media/cms/home/banners/category-shoes-144_200.jpg',
  LOCAL_CATEGORY_SHOES_320: 'pub/media/cms/home/banners/category-shoes-320_432.jpg',
  LOCAL_TEASER_SMALL: 'pub/media/cms/home/teasers/teaser-small-girl_304-304.jpg',
  LOCAL_TEASER_MEDIUM_376: 'pub/media/cms/home/teasers/teaser-medium-girl_376-432.jpg',
  LOCAL_TEASER_MEDIUM_472: 'pub/media/cms/home/teasers/teaser-medium-girl_472-432.jpg',
  LOCAL_TEASER_LARGE: 'pub/media/cms/home/teasers/teaser-large-girl_1328-1200.jpg'
}
