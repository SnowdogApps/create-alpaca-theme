import { readFile } from 'fs/promises';
import { createFile } from './local-env-actions.mjs';

export async function addFile(templatePath, fileName, themeName) {
  try {
    const template = await readFile(new URL(`../${templatePath}`, import.meta.url));
    createFile(`app/design/frontend/Snowdog/${themeName}/Snowdog_Components/${fileName}`, template)
  } catch (error) {
    console.error(`\n${error}`)
  }
}