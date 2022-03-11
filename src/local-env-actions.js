import * as fs from 'fs'
import * as fsPromises from 'fs/promises'
import { readFile } from 'fs/promises'
import { BASE_PATH } from '../constants/constants.js'

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

export async function createFile(path, payload) {
  return fsPromises.writeFile(path, payload, (err) => {
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
    replacePhrase,
    phraseToReplace,
    useSampleTemplate,
    addThemeNameToFileName,
    prependedImport,
    replaceWith
  } = file

  try {
    const template = useSampleTemplate
      ? await readFile(new URL(templateFilePath, import.meta.url))
      : await readFile(templateFilePath)
    const re = new RegExp(phraseToReplace, 'gim')
    const filePath = `${BASE_PATH}${themeName}${childFileDestination}`
    let updatedTemplate = null

    if (replacePhrase) {
      updatedTemplate = template.toString().replace(re, replaceWith || themeName)
    } else if (name === 'variables.scss') {
      updatedTemplate = template.toString().replace(/^/gm, '//')
    } else {
      updatedTemplate = template
    }

    if (childFileDestination.includes('dev')) {
      await createFile(childFileDestination, updatedTemplate)
    } else if (addThemeNameToFileName) {
      await createFile(`${filePath}_${themeName}-${name}`, updatedTemplate)
    } else {
      await createFile(`${filePath}${name}`, updatedTemplate)
    }

    if (prependedImport) {
      const data = fs.readFileSync(`${filePath}${name}`)
      const dataArr = data.toString().split('\n')
      const lineIdx = dataArr.findIndex((str) => str.includes('variables'))

      dataArr.splice(lineIdx + 2, 0, prependedImport.replace(re, themeName))
      const text = dataArr.join('\n')
      const fd = fs.openSync(`${filePath}${name}`, 'w+')

      fs.writeSync(fd, text, 0, text.length, 0)
      fs.close(fd)
    }
  } catch (error) {
    console.error(`\n${error}`)
  }
}

export async function copyImage(imagePaths) {
  const {
    imgTemplatePath,
    localImgPath
  } = imagePaths
  const img = await readFile(new URL(imgTemplatePath, import.meta.url))

  try {
    await createFile(localImgPath, img)
  } catch (error) {
    console.error(`\n${error}`)
  }
}
