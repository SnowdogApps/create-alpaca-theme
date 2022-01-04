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

export async function addChildThemeFile(file, themeName, fullThemeName = null) {
  const { name, path, dirPath, shouldReplace } = file

  try {
    if (shouldReplace) {
      const template = await readFile(new URL(`../${path}`, import.meta.url));
      let templateUpdated = null;
      if (fullThemeName) {
        templateUpdated = template.toString().replace(/YOUR_THEME_NAME/gim, fullThemeName)
      } else {
        templateUpdated = template.toString().replace(/YOUR_THEME_NAME/gim, themeName)
      }
      if (dirPath) {
        createFile(dirPath, templateUpdated)
      } else {
        createFile(`app/design/frontend/Snowdog/${themeName}/${name}`, templateUpdated)
      }
    } else {
      const template = await readFile(new URL(`../${path}`, import.meta.url));
      if (dirPath) {
        createFile(dirPath, template)
      } else {
        createFile(`app/design/frontend/Snowdog/${themeName}/${name}`, template)
      }
    }
  } catch (error) {
    console.error(`\n${error}`)
  }
}
