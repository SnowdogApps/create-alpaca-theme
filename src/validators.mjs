import { exec } from 'child_process'
import fs from 'fs'
import _colors from 'colors'

const nameNotProvidedMessage = 'It cannot be empty. Please provide valid theme name'
const nameToShortMessage = 'Your theme name should be at least 3 characters long.'
const nameMinimumLength = 3

export function validateInput(inputString) {
  if (inputString.length === 0) {
    return nameNotProvidedMessage
  } else if (inputString.length < nameMinimumLength) {
      return nameToShortMessage
    }

  return true
}

export function validateComposer() {
  return new Promise((resolve, reject) => {
    exec("composer -v", (error, stdout, stderr) => {
      if (error) {
          reject(_colors.red(`error: ${error.message}`));
          return;
      }
      if (stderr) {
          reject(_colors.yellow(`stderr: ${stderr}`));
          return;
      }

    resolve('Composer is installed in this system')
    });
  })
}

export function validateMagento() {
  const path = './bin/magento'

  if (fs.existsSync(path)) {
    return true
  } else {
    console.error(_colors.red('This directory is not valid Magento instance.'))
    console.error(_colors.yellow('Try again from Magento project root directory.'))
  }
}