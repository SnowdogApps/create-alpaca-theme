import { readFile } from 'fs/promises'
import { createFile } from './local-env-actions.js'
import { validateYarn } from './validators.js'
import promiseExec from '../utils/promiseExec.js'
import { BASE_PATH } from '../utils/constants.js'

export async function addFile(templatePath, fileName, themeName, dirPath = null) {
  try {
    const template = await readFile(new URL(templatePath, import.meta.url))

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
    return promiseExec(`cd ${BASE_PATH}${themeName}/Snowdog_Components && yarn install`, (msg) => {
      return `There was an error installing Snowdog_Components: ${msg}`
    })
  }

  return promiseExec(`cd ${BASE_PATH}${themeName}/Snowdog_Components && npm install`, (msg) => {
    return `There was an error installing Snowdog_Components: ${msg}`
  })
}
