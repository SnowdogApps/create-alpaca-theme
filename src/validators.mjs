import promiseExec from '../utils/promiseExec.mjs'
import fs from 'fs'
import {
  NAME_MINIMUM_LENGTH,
  NAME_TO_SHORT_MSG,
  NAME_NOT_PROVIDED_MSG,
  REGISTRATION_NAME_NOT_SINGULAR,
  BANNED_NAMES_MSG
} from '../utils/constants.mjs'

export function validateName(inputString) {
  if (inputString.length === 0) {
    return NAME_NOT_PROVIDED_MSG
  } else if (inputString.length < NAME_MINIMUM_LENGTH) {
    return NAME_TO_SHORT_MSG
  } else if (inputString === 'Alpaca Theme') {
    return BANNED_NAMES_MSG
  }

  return true
}

export function validateRegistrationName(inputString) {
  if (inputString.length === 0) {
    return NAME_NOT_PROVIDED_MSG
  } else if (inputString.length < NAME_MINIMUM_LENGTH) {
    return NAME_TO_SHORT_MSG
  } else if (inputString.split(' ').length > 1) {
    return REGISTRATION_NAME_NOT_SINGULAR
  } else if (inputString === 'alpaca') {
    return BANNED_NAMES_MSG
  }

  return true
}

export function validateComposer() {
  return promiseExec('composer -v', msg => {
    return `There was an while validating composer: ${msg}`
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

export function validateYarn() {
  return promiseExec('yarn -v', msg => {
    return `There was an issue validating yarn: ${msg}`
  })
}
