import { exec } from 'child_process'
import fs from 'fs'
import _colors from 'colors'

const NAME_NOT_PROVIDED_MSG = 'It cannot be empty. Please provide valid theme name'
const NAME_TO_SHORT_MSG = 'Your theme name should be at least 3 characters long.'
const nameMinimumLength = 3
const NOT_MAGENTO_MSG_TOP = 'This directory is not valid Magento instance.'
const NOT_MAGENTO_MSG_BOTTOM = 'Try again from Magento project root directory.'

export function validateInput(inputString) {
  if (inputString.length === 0) {
    return NAME_NOT_PROVIDED_MSG
  } else if (inputString.length < nameMinimumLength) {
    return NAME_TO_SHORT_MSG
  };

  return true
};

export function validateComposer() {
  return new Promise((resolve, reject) => {
    exec("composer -v", error => {
      if (error) {
        reject(`Error while validating composer:\n${error.message}`);
      }

      resolve('Composer is installed in this system')
    });
  });
};

export function isMagentoInstance() {
  const path = './bin/magento'

  if (fs.existsSync(path)) {
    return true
  } else {
    console.error(_colors.red(NOT_MAGENTO_MSG_TOP))
    console.error(_colors.yellow(NOT_MAGENTO_MSG_BOTTOM))
  };
};