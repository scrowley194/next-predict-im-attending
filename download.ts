import fs from 'fs';
import https from 'https';
import path from 'path';

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location as string, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      
      const dir = path.dirname(dest);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const file = fs.createWriteStream(dest);
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

const driveId = '1Rj8WLkMnWl24GdLqS_2SMrv1TDe1kxGh';
const url = `https://drive.google.com/uc?export=download&id=${driveId}`;
const dest = path.join(process.cwd(), 'public', 'logo.png');

console.log('Downloading logo...');
downloadFile(url, dest)
  .then(() => console.log('Logo downloaded successfully to ' + dest))
  .catch((err) => console.error('Error downloading logo:', err));
