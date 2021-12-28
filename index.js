const inquirer = require('inquirer')
const fs = require('fs')

const supportedMagentoVersions = ['2.4.3', '2.3.5']
const supportedFrontoolsVersions = ['1.12', '1.11']
const nameNotProvidedMessage = 'It cannot be empty. Please provide valid theme name'
const nameMinimumLength = 3
const nameToShortMessage = 'Your theme name should be at least 3 characters long.'
const magentoInstanceErrorMessage = 'This directory is not a valid Magento project. Please run npx again from main Magento project directory.'

if (checkIfMagentoInstance()) {
  inquirer.prompt([
    {
      type: 'input',
      message: "Enter your theme name:",
      name: 'Theme Name',
      validate: validateInput
    },
    {
      type: 'list',
      message: "Pick Magento version you're using:",
      name: 'Magento version:',
      choices: supportedMagentoVersions,
      loop: true
    },
    {
      type: 'list',
      message: "Choose frontools version:",
      name: 'Frontools version:',
      choices: supportedFrontoolsVersions,
      loop: true
    }
  ])
  .then(answers => {
    console.log(answers)
  })
}



function validateInput(inputString) {
  if (inputString.length === 0) {
    return nameNotProvidedMessage
  } else if (inputString.length < nameMinimumLength) {
      return nameToShortMessage
    }
s
  return true
}

function checkIfMagentoInstance() {
  const path = './bin/magento'

  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      console.error(magentoInstanceErrorMessage)
    }
  })

  return true
}

