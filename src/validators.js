import fs from 'fs'
import promiseExec from '../utils/promiseExec.js'
import {
  NAME_MINIMUM_LENGTH,
  NAME_TO_SHORT_MSG,
  NAME_NOT_PROVIDED_MSG,
  REGISTRATION_NAME_NOT_SINGULAR,
  BANNED_NAMES_MSG,
  BANNED_NAMES_LIST,
  NAME_NOT_LOWERCASE
} from '../utils/constants.js'

function getNameValidator(customRule) {
  return (name) => {
    if (name.length === 0) {
      return NAME_NOT_PROVIDED_MSG
    }
    if (name.length < NAME_MINIMUM_LENGTH) {
      return NAME_TO_SHORT_MSG
    }
    if (BANNED_NAMES_LIST.includes(name)) {
      return BANNED_NAMES_MSG
    }

    return customRule ? customRule(name) : true
  }
}

export const validateName = getNameValidator()

export const validateRegistrationName = getNameValidator((name) => {
  if (name.split(' ').length > 1) {
    return REGISTRATION_NAME_NOT_SINGULAR
  }
  if (name !== name.toLowerCase()) {
    return NAME_NOT_LOWERCASE
  }

  return true
})

export function validateComposer() {
  return promiseExec('composer -v', (msg) => {
    return `There was an while validating composer: ${msg}`
  })
}

export function isMagentoInstance() {
  const path = './bin/magento'

  if (fs.existsSync(path)) {
    return true
  }

  return false
}

export function validateYarn() {
  return promiseExec('yarn -v', (msg) => {
    return `There was an issue validating yarn: ${msg}`
  })
}
