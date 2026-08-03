const fs = require('fs');
const path = require('path');

function walkAndClean(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkAndClean(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.png') {
        // Protect web icons & favicons
        if (
          file.startsWith('favicon') ||
          file.startsWith('apple-touch-icon') ||
          file.startsWith('android-chrome')
        ) {
          console.log(`[PRESERVED ICON] ${path.relative(process.cwd(), fullPath)}`);
          continue;
        }

        const baseName = path.basename(file, ext);
        const webpPath = path.join(dir, `${baseName}.webp`);
        if (fs.existsSync(webpPath)) {
          fs.unlinkSync(fullPath);
          console.log(`[DELETED OLD PNG] ${path.relative(process.cwd(), fullPath)}`);
        }
      }
    }
  }
}

const publicDir = path.join(process.cwd(), 'public');
console.log('Cleaning up old PNG files with WebP replacements...');
walkAndClean(publicDir);
console.log('Cleanup complete!');
