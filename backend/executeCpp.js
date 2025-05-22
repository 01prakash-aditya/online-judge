import { fileURLToPath } from 'url';
import path, { join, dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const outputPath = join(__dirname, 'outputs');

if (!existsSync(outputPath)) {
  mkdirSync(outputPath, { recursive: true });
}

//    \\Users\\0adit\\online-compiler-cpp\\backend\\codes\\cf9d080c-59b0-49cc-81c6-963e153a664d.cpp

export function executeCpp(filePath) {
    const jobId =path.basename(filePath).split('.')[0];
    const outfileName = `${jobId}.exe`; 
    const outputFilePath = join(outputPath, outfileName);
    return new Promise((resolve, reject) => {
      exec(`g++ ${filePath} -o ${outputFilePath} && cd ${outputPath} && .\\${outfileName}`, (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        if (stderr) {
          reject(stderr);
          return;
        }
        if (stdout) {
          resolve(stdout);
          return;
        }
      })
    });
}