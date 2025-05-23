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

export function executeCpp(filePath) {
  const jobId = path.basename(filePath).split('.')[0];
  const outfileName = `${jobId}.exe`;
  const outputFilePath = join(outputPath, outfileName);
  
  return new Promise((resolve, reject) => {
    const command = `g++ ${filePath} -o ${outputFilePath} && ${outputFilePath}`;
    
    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error) {
        if (error.code === 'TIMEOUT') {
          return reject(new Error('Execution timeout (5 seconds exceeded)'));
        }
        return reject(error);
      }
      if (stderr) {
        return reject(new Error(stderr));
      }
      resolve(stdout);
    });
  });
}