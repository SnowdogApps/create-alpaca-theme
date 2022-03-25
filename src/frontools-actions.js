import promiseExec from './utils/promiseExec.js'
import { validateYarn } from './validators.js'
import { FRONTOOLS_PATH } from './constants/constants.js'

const INSTALLING_ERROR_MSG = 'There was an error installing Frontools:'
const COMPILING_ERROR_MSG = 'There was an error compiling files with Frontools:'

export async function installFrontools() {
  const isYarn = await validateYarn()
  const packageManager = isYarn ? 'yarn' : 'npm'

  return promiseExec(`cd ${FRONTOOLS_PATH} && ${packageManager} install && ${packageManager} ${isYarn ? 'setup' : 'run setup'}`, (msg) => {
    return `${INSTALLING_ERROR_MSG} ${msg}`
  })
}

export async function compileFiles() {
  const isYarn = await validateYarn()
  const packageManager = isYarn ? 'yarn' : 'npm run'

  return promiseExec(`cd ${FRONTOOLS_PATH} && ${packageManager} styles && ${packageManager} svg && ${packageManager} babel`, (msg) => {
    return `${COMPILING_ERROR_MSG} ${msg}`
  })
}
