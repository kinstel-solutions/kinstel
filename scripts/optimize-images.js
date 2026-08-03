const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') return;

  const stat = fs.statSync(filePath);
  const origSizeKB = (stat.size / 1024).toFixed(1);

  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const webpPath = path.join(dir, `${baseName}.webp`);

  try {
    // 1. Generate optimized WebP
    await sharp(filePath)
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath + '.tmp');

    if (fs.existsSync(webpPath)) {
      fs.unlinkSync(webpPath);
    }
    fs.renameSync(webpPath + '.tmp', webpPath);

    const webpStat = fs.statSync(webpPath);
    const webpSizeKB = (webpStat.size / 1024).toFixed(1);
    const savings = (((stat.size - webpStat.size) / stat.size) * 100).toFixed(1);

    console.log(`[WEBP] ${path.relative(process.cwd(), filePath)}: ${origSizeKB} KB -> ${webpSizeKB} KB (${savings}% saved)`);

    // 2. Also compress PNG in-place if it's home-og-image or key banner
    if (filePath.includes('home-og-image.png') || stat.size > 500000) {
      const compressedPngPath = filePath + '.tmp.png';
      await sharp(filePath)
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(compressedPngPath);

      const compStat = fs.statSync(compressedPngPath);
      if (compStat.size < stat.size) {
        fs.unlinkSync(filePath);
        fs.renameSync(compressedPngPath, filePath);
        console.log(`  [PNG COMPRESSED] ${path.relative(process.cwd(), filePath)}: ${origSizeKB} KB -> ${(compStat.size / 1024).toFixed(1)} KB`);
      } else {
        fs.unlinkSync(compressedPngPath);
      }
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else {
      processImage(fullPath);
    }
  }
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  console.log('Starting image optimization with sharp...');
  await walkDir(publicDir);
  console.log('Image optimization complete!');
}

main();
