import fs from 'fs'

export function replaceJSONContents(path, json) {
  fs.writeFileSync(path, JSON.stringify(json), err => {
    if (err) {
      console.error(err);
    }

    console.log('done');
  });
}

export function renameTheme(path, themeName) {
  fs.readFile(path, 'utf-8', function(err, data) {
    if (err) {
      console.error(err)
    }

    var newValue = data.replace(/YOUR_THEME_NAME/gim, themeName);

    fs.writeFile(path, newValue, 'utf-8', function(err, data) {
      if (err) {
        console.error(err)
      }
    })
 })
}

export function renameBrowserSyncPaths(path, themeName) {
  fs.readFile(path, 'utf-8', function(err, data) {
    if (err) {
      console.error(err)
    }

    var newValue = data.replace(/alpaca-boilerplate.test/gim, `${themeName}.test`);

    fs.writeFile(path, newValue, 'utf-8', function(err, data) {
      if (err) {
        console.error(err)
      }
    })
 })
}

export function createDirectory(path) {
  fs.promises.mkdir(path, { recursive: true }, (err) => {
    if (err) {
      console.error(err)
    }
  });
}

export function createThmeRegistrationFiles(path, payload) {
  fs.writeFile(path, payload, function (err) {
    if (err) {
      console.error(err)
    }
  });
}
