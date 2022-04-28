import readFile from '../core/readFile.js';

const parseJsonFile = (filepath) => JSON.parse(readFile(filepath));

export default parseJsonFile;
