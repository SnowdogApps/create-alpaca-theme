import { exec } from 'child_process'

export function composerRequire(composerPackage) {
  return new Promise((resolve, reject) => {
    exec(`composer require ${composerPackage}`, (error) => {
      if (error) {
        reject(`error: ${error.message}`);
        return;
      }

      resolve('Requested package installed');
    });
  })
}
