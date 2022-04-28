import { load } from 'js-yaml';
import readFile from '../core/readFile.js';

const parseYamlFile = (filepath) => load(readFile(filepath));

export default parseYamlFile;
