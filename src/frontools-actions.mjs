import promiseExec from '../utils/promiseExec.mjs'

export function installFrontools() {
  return promiseExec(`cd vendor/snowdog/frontools && yarn install && yarn setup`, msg => {
    `There was an error installing Frontools: ${msg}`
  })
}

export function compileFiles() {
  return promiseExec(`cd vendor/snowdog/frontools && yarn styles && yarn svg && yarn babel`, msg => {
    `There was an error compiling files with Frontools: ${msg}`
  })
}