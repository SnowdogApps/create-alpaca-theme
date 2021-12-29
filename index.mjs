#!/usr/bin/env node

import inquirer from 'inquirer';
import {
  validateInput,
  validateComposer,
  validateMagento
} from './src/validators.mjs';
import { composerRequire } from './src/composer-actions.mjs';

const alpacaPackagesPath = 'snowdog/module-alpaca-packages'
const frontoolsPath = 'snowdog/frontools'
const supportedMagentoVersions = ['2.4.3', '2.3.5']
const supportedFrontoolsVersions = ['1.12', '1.11']

if (validateMagento()) {
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
    validateComposer()
    composerRequire(alpacaPackagesPath)
    composerRequire(frontoolsPath)
  })
}