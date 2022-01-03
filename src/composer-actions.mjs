import { exec } from 'child_process'
import _colors from 'colors'

export function composerRequire(composerPackage) {
  return new Promise((resolve, reject) => {
    exec(`composer require ${composerPackage}`, error => {
      if (error) {
        reject(`There was an error installing ${_colors.yellow(composerPackage)}: ${error.message}`);
      }

      resolve('Requested package installed');
    });
  });
};
