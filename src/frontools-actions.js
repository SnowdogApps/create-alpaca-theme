import promiseExec from '../utils/promiseExec.js'
import { validateYarn } from './validators.js'
import { FRONTOOLS_PATH } from '../utils/constants.js'

const installingErrorMsg = 'There was an error installing Frontools:'
const compilingErrorMsg = 'There was an error compiling files with Frontools:'

export function installFrontools() {
  if (validateYarn()) {
    return promiseExec(`cd ${FRONTOOLS_PATH} && yarn install && yarn setup`, (msg) => {
      return `${installingErrorMsg} ${msg}`
    })
  }
  return promiseExec(`cd ${FRONTOOLS_PATH} && npm install && npm run setup`, (msg) => {
    return `${installingErrorMsg} ${msg}`
  })
}

export function compileFiles() {
  if (validateYarn()) {
    return promiseExec(`cd ${FRONTOOLS_PATH} && yarn styles && yarn svg && yarn babel`, (msg) => {
      return `${compilingErrorMsg} ${msg}`
    })
  }
  return promiseExec(`cd ${FRONTOOLS_PATH} && npm run styles && npm run svg && npm run babel`, (msg) => {
    return `${compilingErrorMsg} ${msg}`
  })
}
