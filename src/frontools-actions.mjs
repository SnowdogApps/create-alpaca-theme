import { exec } from 'child_process'

export function installFrontools() {
  exec(`cd vendor/snowdog/frontools && yarn install && yarn setup`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
}