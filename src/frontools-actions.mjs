import { exec } from 'child_process'

export function installFrontools() {
  return new Promise((resolve, reject) => {
    exec(`cd vendor/snowdog/frontools && yarn install && yarn setup`, (error, stdout, stderr) => {
      if (error) {
          reject(`error: ${error.message}`);
          return;
      }

      resolve('Frontools installed correctly');
    });
  });
}