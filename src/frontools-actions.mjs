import { exec } from 'child_process'

export function installFrontools() {
  return new Promise((resolve, reject) => {
    exec(`cd vendor/snowdog/frontools && yarn install && yarn setup`, (error, stdout, stderr) => {
      if (error) {
          reject(`error: ${error.message}`);
          throw error;
      }

      resolve('Frontools installed correctly');
    });
  });
}

export function compileFiles() {
  return new Promise((resolve, reject) => {
    exec(`cd vendor/snowdog/frontools && yarn styles && yarn svg && yarn babel`, (error, stdout, stderr) => {
      if (error) {
          reject(`error: ${error.message}`);
          return;
      }

      resolve('Files compiled');
    });
  });
}