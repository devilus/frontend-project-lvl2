import { readFileSync } from 'fs';

const readFile = (filepath) => {
  try {
    return readFileSync(filepath, 'utf-8');
  } catch (error) {
    throw new Error(`File ${filepath} not found`);
  }
};

const parseJsonFile = (filepath) => JSON.parse(readFile(filepath));

export { parseJsonFile };
