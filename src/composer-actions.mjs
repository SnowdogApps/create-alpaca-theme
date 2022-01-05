import colors from 'colors'
import promiseExec from '../utils/promiseExec.mjs'

export function composerRequire(composerPackage) {
  return promiseExec(`composer require ${composerPackage}`, msg => {
    return `There was an error installing ${colors.yellow(composerPackage)}: ${msg}`
  })
}
