import { resolve } from 'path';
import { cwd as getWorkingDir } from 'process';
import { readFileSync } from 'fs';

const makeAbsolutePath = (filepath) => resolve(getWorkingDir(), filepath);

const readFile = (filepath) => {
  try {
    return readFileSync(makeAbsolutePath(filepath), 'utf-8');
  } catch (error) {
    throw new Error(`File ${filepath} not found`);
  }
};

const parseJsonFile = (filepath) => JSON.parse(readFile(filepath));

export { parseJsonFile };
