import { readFile } from 'fs/promises';
import { createFile } from './local-env-actions.mjs';
import promiseExec from '../utils/promiseExec.mjs'

export async function addFile(templatePath, fileName, themeName, dirPath = null) {
  try {
    if (dirPath === null) {
      const template = await readFile(new URL(`../${templatePath}`, import.meta.url));
      createFile(`app/design/frontend/Snowdog/${themeName}/Snowdog_Components/${fileName}`, template)
    } else {
      const template = await readFile(new URL(`../${templatePath}`, import.meta.url));
      const templateUpdated = template.toString().replace(/YOUR_THEME_NAME/gim, themeName)
      createFile(dirPath, templateUpdated)
    }
  } catch (error) {
    console.error(`\n${error}`)
  }
}

export function installComponents(themeName) {
  return promiseExec(`cd app/design/frontend/Snowdog/${themeName}/Snowdog_Components && yarn install`, msg => {
    return `There was an error installing Snowdog_Components: ${msg}`
  })
}