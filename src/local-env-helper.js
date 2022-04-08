import * as fs from 'fs'
import { readFile } from 'fs/promises'
import { BASE_THEME_PATH } from './constants/constants.js'
import {
  createFile,
  listFiles
} from './utils/fileSystem.js'

export async function replacePhrase(filePath, phraseToReplace, phraseToReplaceWith) {
  const re = new RegExp(phraseToReplace, 'gim')
  const file = await readFile(filePath)
  const fileUpdated = file.toString().replace(re, phraseToReplaceWith)

  await createFile(filePath, fileUpdated)
}

export async function addFilesFromDir(dir, themeName, ignoredFiles, vendor, dirInChildTheme = '') {
  const configFiles = await listFiles(dir)
  const re = new RegExp(ignoredFiles)
  const configFilesFiltered = configFiles.filter((str) => !re.test(str))

  await Promise.all(configFilesFiltered.map(async (fileName) => {
    const file = await readFile(`${dir}/${fileName}`)
    await createFile(`${BASE_THEME_PATH}${vendor}/${themeName}${dirInChildTheme}/${fileName}`, file)
  }))
}

export async function addFilesFromTemplate(templateDir, targetDir) {
  const fileList = await listFiles(new URL(templateDir, import.meta.url))

  await Promise.all(fileList.map(async (fileName) => {
    const file = await readFile(new URL(`${templateDir}/${fileName}`, import.meta.url))
    const updatedFileName = fileName.replace(/.sample/g, '')

    await createFile(`${targetDir}/${updatedFileName}`, file)
  }))
}

export async function replacePhraseInAll(filesToUpdate, dir) {
  await Promise.all(filesToUpdate.map(async (file) => {
    await replacePhrase(`${dir}/${file.name}`, file.phraseToReplace, file.phraseToReplaceWith)
  }))
}

// Prepend text to a file, e.g. variables import
export async function prependImport(
  filePath,
  textToPrepend,
  themeName,
  lineToPrepend = null,
  prependAfterWord = null,
  phraseToReplace = null
) {
  const data = fs.readFileSync(filePath)
  const dataArr = data.toString().split('\n')
  const lineIdx = lineToPrepend || dataArr.findIndex((str) => str.includes(prependAfterWord)) + 2
  const re = phraseToReplace ? new RegExp(phraseToReplace, 'gim') : null

  dataArr.splice(lineIdx, 0, phraseToReplace ? textToPrepend.replace(re, themeName) : textToPrepend)
  const text = dataArr.join('\n')
  const fd = fs.openSync(filePath, 'w+')

  fs.writeSync(fd, text, 0, text.length, 0)
  fs.close(fd)
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
