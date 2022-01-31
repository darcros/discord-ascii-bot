import { readdir } from 'fs/promises';
import { join } from 'path';

const relative = (path) => new URL(path, import.meta.url).pathname;

const loadFolder = async (path) => {
  const files = await readdir(path);

  const modules = files
    .filter((file) => file.endsWith('.mjs'))
    .map((file) => import(join(path, file)));

  return await Promise.all(modules);
};

export const loadCommands = async () => {
  return {
    slash: await loadFolder(relative('./commands/slash')),
    context: await loadFolder(relative('./commands/context')),
  };
};
