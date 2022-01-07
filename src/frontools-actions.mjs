import promiseExec from '../utils/promiseExec.mjs'
import { validateYarn } from './validators.mjs'
import { FRONTOOLS_PATH } from '../utils/constants.mjs'

export function installFrontools() {
  if (validateYarn()) {
    return promiseExec(`cd ${FRONTOOLS_PATH} && yarn install && yarn setup`, msg => {
      return `There was an error installing Frontools: ${msg}`
    })
  } else {
    return promiseExec(`cd ${FRONTOOLS_PATH} && npm install && npm run setup`, msg => {
      return `There was an error installing Frontools: ${msg}`
    })
  }
}


export function compileFiles() {
  if (validateYarn()) {
    return promiseExec(`cd ${FRONTOOLS_PATH} && yarn styles && yarn svg && yarn babel`, msg => {
      return `There was an error compiling files with Frontools: ${msg}`
    })
  } else {
    return promiseExec(`cd ${FRONTOOLS_PATH} && npm run styles && npm run svg && npm run babel`, msg => {
      return `There was an error compiling files with Frontools: ${msg}`
    })
  }
}
