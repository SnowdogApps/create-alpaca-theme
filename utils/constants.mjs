import colors from 'colors'

export const NOT_MAGENTO_MSG_TOP = 'This directory is not valid Magento instance.'
export const NOT_MAGENTO_MSG_BOTTOM = 'Try again from Magento project root directory.'
export const CHECK_MARK_CHARACTER = '\u2713'

// composer download paths
export const PACKAGE_PATH = {
  ALPACA_PACKAGES: 'snowdog/module-alpaca-packages',
  FRONTOOLS: 'snowdog/frontools'
}

// templates paths
export const TEMPLATE_PATHS = {
  BROWSER_SYNC: './templates/browser-sync.json.sample',
  REGISTRATION: './templates/registration.php.sample',
  THEME_XML: './templates/theme.xml.sample',
  THEMES_JSON: './templates/themes.json.sample'
}

// local environment paths
export const LOCAL_ENV_PATHS = {
  BROWSER_SYNC: 'dev/tools/frontools/config/browser-sync.json',
  THEMES_JSON: 'dev/tools/frontools/config/themes.json'
}

// loading bar
export const LOADING_BAR = {
  FORMAT: '  |' + colors.cyan('{bar}') + '| {percentage}% || {info}',
  COMPLETE_CHAR: '\u2588',
  INCOMPLETE_CHAR: '\u2591',
  SIZE: 30,
  CURSOR_HIDDEN: true
}

// validators
export const NAME_NOT_PROVIDED_MSG = 'It cannot be empty. Please provide valid theme name'
export const NAME_TO_SHORT_MSG = 'Your theme name should be at least 3 characters long.'
export const NAME_MINIMUM_LENGTH = 3