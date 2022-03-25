// Directories to be created before files setup
import {
  CMS_BANNERS_DIR,
  CMS_TEASERS_DIR,
  MAGENTO_CHECKOUT_STYLES,
  ENV_PATH
} from './constants.js'

export const directoriesList = [
  '/',
  '/styles',
  MAGENTO_CHECKOUT_STYLES,
  ENV_PATH.COMPONENT_DOCS_STYLES_DIR,
  ENV_PATH.COMPONENT_VARIABLES_DIR
]

export const exemplaryComponentDirectories = [
  ENV_PATH.SNOWDOG_COMPONENTS_STYLES_DIR,
  `${ENV_PATH.SNOWDOG_COMPONENTS_MOLECULES_DIR}/button`
]

export const mediaDirList = [
  CMS_BANNERS_DIR,
  CMS_TEASERS_DIR
]
