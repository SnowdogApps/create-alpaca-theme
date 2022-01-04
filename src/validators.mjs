import promiseExec from '../utils/promiseExec.mjs'
import fs from 'fs'
import {
  NAME_MINIMUM_LENGTH,
  NAME_TO_SHORT_MSG,
  NAME_NOT_PROVIDED_MSG
} from '../utils/constants.mjs'

export function validateInput(inputString) {
  if (inputString.length === 0) {
    return NAME_NOT_PROVIDED_MSG
  } else if (inputString.length < NAME_MINIMUM_LENGTH) {
    return NAME_TO_SHORT_MSG
  }

  return true
}

export function validateComposer() {
  return promiseExec(`composer -v`, msg => {
    `There was an while validating composer: ${msg}`
  })
}

export function isMagentoInstance() {
  const path = './bin/magento'

  if (fs.existsSync(path)) {
    return true
  } else {
    return false
  }
}