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
  exec("composer -v", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

  // temp
  console.log('composer installed in this system')
  return
  });
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