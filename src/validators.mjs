import { exec } from 'child_process'
import fs from 'fs'

const nameNotProvidedMessage = 'It cannot be empty. Please provide valid theme name'
const nameToShortMessage = 'Your theme name should be at least 3 characters long.'
const nameMinimumLength = 3
const magentoInstanceErrorMessage = 'This directory is not a valid Magento project. Please run npx again from main Magento project directory.'

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
          reject(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
      }

    resolve('Composer is installed in this system')
    });
  })
}

export function validateMagento() {
  const path = './bin/magento'

  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      console.error(magentoInstanceErrorMessage)
    }
  })

  return true
}