#!/usr/bin/env node

import {
  validateInput,
  validateComposer,
  validateMagento
} from './src/validators.mjs';
import inquirer from 'inquirer';
import fs from 'fs'
import { exec } from 'child_process'

const supportedMagentoVersions = ['2.4.3', '2.3.5']
const supportedFrontoolsVersions = ['1.12', '1.11']
const magentoInstanceErrorMessage = 'This directory is not a valid Magento project. Please run npx again from main Magento project directory.'

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
    //   exec("composer require snowdog/module-alpaca-packages", (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.log(`stderr: ${stderr}`);
    //         return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    // });

    validateComposer()
  })
}