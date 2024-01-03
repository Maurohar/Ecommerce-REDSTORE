import path from 'path';
import url from 'url';
import bcrypt, { hashSync } from "bcrypt";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export { __dirname };

export const createHash = (password) => {
    const result = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    return result;
  };
  
  export const isValidPassword = (password, dbPassword) => {
    const result = bcrypt.compareSync(password, dbPassword);
    return result;
  };