import { readdir } from 'fs/promises';
import { join } from 'path';

const commandsDir = new URL('./commands', import.meta.url).pathname;

export const loadCommands = async () => {
  const files = await readdir(commandsDir);

  const modules = files
    .filter((file) => file.endsWith('.mjs'))
    .map((file) => import(join(commandsDir, file)));

  return await Promise.all(modules);
};
