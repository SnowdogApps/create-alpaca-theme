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
