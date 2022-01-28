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
    const template = useSampleTemplate
      ? await readFile(new URL(templateFilePath, import.meta.url))
      : await readFile(templateFilePath)
    const re = new RegExp(phraseToRename, 'gim')

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
