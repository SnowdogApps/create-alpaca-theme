import { readFile } from 'fs/promises';
import { createFile } from './local-env-actions.mjs';
import { validateYarn } from './validators.mjs';
import promiseExec from '../utils/promiseExec.mjs'
import { BASE_PATH } from '../utils/constants.mjs';

export async function addFile(templatePath, fileName, themeName, dirPath = null) {
  try {
    const template = await readFile(new URL(`../${templatePath}`, import.meta.url));

    if (dirPath === null) {
      createFile(`${BASE_PATH}${themeName}/Snowdog_Components/${fileName}`, template)
    } else {
      const templateUpdated = template.toString().replace(/YOUR_THEME_NAME/gim, themeName)
      createFile(dirPath, templateUpdated)
    }
  } catch (error) {
    console.error(`\n${error}`)
  }
}

export function installComponents(themeName) {
  if (validateYarn()) {
    return promiseExec(`cd ${BASE_PATH}${themeName}/Snowdog_Components && yarn install`, msg => {
      return `There was an error installing Snowdog_Components: ${msg}`
    })
  } else {
    return promiseExec(`cd ${BASE_PATH}${themeName}/Snowdog_Components && npm install`, msg => {
      return `There was an error installing Snowdog_Components: ${msg}`
    })
  }
}
