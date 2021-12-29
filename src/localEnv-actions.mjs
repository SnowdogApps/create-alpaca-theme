import fs from 'fs'

export function replaceContents(path, json) {
    fs.writeFileSync(path, JSON.stringify(json), err => {
      if (err) {
        console.log(err);
      }

      console.log('done');
    });
}
