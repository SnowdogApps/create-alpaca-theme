import fs from 'fs'
import { readFile } from 'fs/promises'
import { BASE_PATH } from '../utils/constants.js'

export function createDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        reject(err)
      }

      resolve()
    })
  })
}

export function createFile(path, payload) {
  fs.writeFile(path, payload, (err) => {
    if (err) {
      throw err
    }
  })
}

export async function addChildThemeFile(file, themeName, fullThemeName = null) {
  const {
    name,
    path,
    dirPath,
    shouldReplace
  } = file

  try {
    const template = await readFile(new URL(path, import.meta.url))
    const replaceTemplate = (newThemeName) => template.toString().replace(/YOUR_THEME_NAME/gim, newThemeName)

    if (shouldReplace) {
      const templateUpdated = replaceTemplate(fullThemeName || themeName)
      createFile(dirPath || `${BASE_PATH}${themeName}/${name}`, templateUpdated)
    } else {
      createFile(dirPath || `${BASE_PATH}${themeName}/${name}`, template)
    }
  } catch (error) {
    console.error(`\n${error}`)
  }
}

export async function addTemplateFile(file, themeName = null) {
  const {
    name,
    templateFilePath,
    childFileDestination,
    rename,
    phraseToRename,
    useSampleTemplate,
    addThemeNameToFileName
  } = file

  try {
    let template = null
    const re = new RegExp(phraseToRename, 'gim')

    if (useSampleTemplate) {
      template = await readFile(new URL(templateFilePath, import.meta.url))
    } else {
      template = await readFile(templateFilePath)
    }

    if (rename) {
      const updatedTemplate = template.toString().replace(re, themeName)

      if (childFileDestination.includes('dev')) {
        createFile(childFileDestination, updatedTemplate)
      } else {
        if (addThemeNameToFileName) {
          createFile(`${BASE_PATH}${themeName}${childFileDestination}_${themeName}-${name}`, updatedTemplate)
        } else {
          createFile(`${BASE_PATH}${themeName}${childFileDestination}${name}`, updatedTemplate)
        }
      }
    } else {
      if (childFileDestination.includes('dev')) {
        createFile(childFileDestination, template)
      } else {
        if (addThemeNameToFileName) {
          createFile(`${BASE_PATH}${themeName}${childFileDestination}_${themeName}-${name}`, template)
        } else {
          createFile(`${BASE_PATH}${themeName}${childFileDestination}${name}`, template)
        }
      }
    }
  } catch (error) {
    console.error(`\n${error}`)
  }
}
