import promiseExec from '../utils/promiseExec.mjs'
import { validateYarn } from './validators.mjs';

export function installFrontools() {
  if (validateYarn()) {
    return promiseExec(`cd vendor/snowdog/frontools && yarn install && yarn setup`, msg => {
      return `There was an error installing Frontools: ${msg}`
    })
  } else {
    return promiseExec(`cd vendor/snowdog/frontools && npm install && npm run setup`, msg => {
      return `There was an error installing Frontools: ${msg}`
    })
  }
}


export function compileFiles() {
  if (validateYarn()) {
    return promiseExec(`cd vendor/snowdog/frontools && yarn styles && yarn svg && yarn babel`, msg => {
      return `There was an error compiling files with Frontools: ${msg}`
    })
  } else {
    return promiseExec(`cd vendor/snowdog/frontools && npm run styles && npm run svg && npm run babel`, msg => {
      return `There was an error compiling files with Frontools: ${msg}`
    })
  }
}
