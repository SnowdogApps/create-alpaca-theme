import * as fs from 'fs'
import {
  writeFile,
  readdir
} from 'fs/promises'

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
  return writeFile(path, payload, (err) => {
    if (err) {
      throw err
    }
  })
}

// List all files form directory, excluding folders
export async function listFiles(directory) {
  const dirents = await readdir(directory, { withFileTypes: true })

  return dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name)
}
