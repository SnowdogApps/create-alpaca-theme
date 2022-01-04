import fs from 'fs'
import { readFile } from 'fs/promises';

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

export async function addChildThemeFile(templatePath, fileName, themeName, dirPath, replace = false) {
  try {
    if (replace) {
      const template = await readFile(new URL(`../${templatePath}`, import.meta.url));
      const templateUpdated = template.toString().replace(/YOUR_THEME_NAME/gim, themeName)
      if (dirPath) {
        createFile(dirPath, templateUpdated)
      } else {
        createFile(`app/design/frontend/Snowdog/${themeName}/${fileName}`, templateUpdated)
      }
    } else {
      const template = await readFile(new URL(`../${templatePath}`, import.meta.url));
      if (dirPath) {
        createFile(dirPath, template)
      } else {
        createFile(`app/design/frontend/Snowdog/${themeName}/${fileName}`, template)
      }
    }
  } catch (error) {
    console.error(`\n${error}`)
  }
}
