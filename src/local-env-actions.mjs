import fs from 'fs'
import { readFile } from 'fs/promises'
import { BASE_PATH } from '../utils/constants.mjs'

export function createDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, err => {
      if (err) {
        reject(err)
      }

      resolve()
    })
  })
}

export function createFile(path, payload) {
  fs.writeFile(path, payload, err => {
    if (err) {
      throw err
    }
  })
}

export async function addChildThemeFile(file, themeName, fullThemeName = null) {
  const { name, path, dirPath, shouldReplace } = file

  try {
    const template = await readFile(new URL(`../${path}`, import.meta.url))

    if (shouldReplace) {
      let templateUpdated = null

      if (fullThemeName) {
        templateUpdated = template.toString().replace(/YOUR_THEME_NAME/gim, fullThemeName)
      } else {
        templateUpdated = template.toString().replace(/YOUR_THEME_NAME/gim, themeName)
      }
      if (dirPath) {
        createFile(dirPath, templateUpdated)
      } else {
        createFile(`${BASE_PATH}${themeName}/${name}`, templateUpdated)
      }
    } else {
      if (dirPath) {
        createFile(dirPath, template)
      } else {
        createFile(`${BASE_PATH}${themeName}/${name}`, template)
      }
    }
  } catch (error) {
    console.error(`\n${error}`)
  }
}
