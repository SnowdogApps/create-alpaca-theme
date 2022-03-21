import { validateYarn } from './validators.js'
import promiseExec from '../utils/promiseExec.js'
import { BASE_PATH } from '../constants/constants.js'

const COMPONENTS_INSTALL_ERROR_MSG = 'There was an error installing Snowdog_Components:'

export function installComponents(themeName) {
  const packageManager = validateYarn() ? 'yarn' : 'npm'

  return promiseExec(`cd ${BASE_PATH}${themeName}/Snowdog_Components && ${packageManager} install`, (msg) => {
    return `${COMPONENTS_INSTALL_ERROR_MSG} ${msg}`
  })
}
