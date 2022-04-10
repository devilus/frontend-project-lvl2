import { extname } from 'path';
import _ from 'lodash';

const extensions = {
  yaml: ['yaml', 'yml'],
};

const getFileType = (filepath) => {
  const [, fileExt] = extname(filepath).split('.');
  const fileType = _.findKey(extensions, (extList) => extList.indexOf(fileExt) > 0) || fileExt;

  return fileType || null;
};

export default getFileType;
