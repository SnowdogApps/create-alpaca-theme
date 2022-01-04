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
  BROWSER_SYNC: './templates/frontools/browser-sync.json.sample',
  REGISTRATION: './templates/theme/registration.php.sample',
  THEME_XML: './templates/theme/theme.xml.sample',
  THEMES_JSON: './templates/frontools/themes.json.sample',
  EDITOR_CONFIG: './templates/components/.editorconfig.sample',
  ESLINT_IGNORE: './templates/components/.eslintignore.sample',
  ESLINT_RC: './templates/components/.eslintrc.json.sample',
  NODE_VERSIONS: './templates/components/.node-version.sample',
  SASS_LINT: './templates/components/.sass-lint.yml.sample',
  STYLE_LINT_RC: './templates/components/.stylelintrc.sample',
  GULPFILE: './templates/components/gulpfile.js.sample',
  MODULES_JSON: './templates/components/modules.json.sample',
  PACKAGE_JSON: './templates/components/package.json.sample'
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