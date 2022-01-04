import fs from 'fs'

export function replaceJSONContents(path, json) {
  fs.writeFileSync(path, JSON.stringify(json), err => {
    if (err) {
      throw (`Error while copying template files\n${err}`)
    }
  })
}

export function renameTheme(path, themeName) {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      throw err
    }

    const newValue = data.replace(/YOUR_THEME_NAME/gim, themeName);

    fs.writeFile(path, newValue, 'utf-8', err => {
      if (err) {
        throw err
      }
    })
  })
}

export function renameBrowserSyncPaths(path, themeName) {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      throw err
    }

    const newValue = data.replace(/alpaca-boilerplate.test/gim, `${themeName}.test`);

    fs.writeFile(path, newValue, 'utf-8', err => {
      if (err) {
        throw err
      }
    })
  })
}

export function createDirectory(path) {
  fs.promises.mkdir(path, { recursive: true }, err => {
    if (err) {
      throw err
    }
  })
}

export function createThmeRegistrationFiles(path, payload) {
  fs.writeFile(path, payload, err => {
    if (err) {
      throw err
    }
  })
}
