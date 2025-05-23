import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path, { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const dirCodes = join(__dirname, 'codes');

if (!existsSync(dirCodes)) {
  mkdirSync(dirCodes, { recursive: true });
}

export function generateFile( language = 'cpp',code) {
  const jobId   = uuid();
  const fileName = `${jobId}.${language}`;
  const filePath = join(dirCodes, fileName);

  writeFileSync(filePath, code);
  return filePath;
}
