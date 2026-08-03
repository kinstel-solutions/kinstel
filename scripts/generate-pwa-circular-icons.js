const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generatePwaIcons() {
  const sourceImage = path.join(__dirname, '..', 'public', 'logos', 'K arrow 400x400px BG=Black&Circle.webp');
  const publicDir = path.join(__dirname, '..', 'public');

  if (!fs.existsSync(sourceImage)) {
    console.error(`Source image not found: ${sourceImage}`);
    process.exit(1);
  }

  const targets = [
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon.ico', size: 32 }, // PNG format at 32x32 for modern browsers
  ];

  console.log('Generating Circular Container Favicons & PWA Icons...');

  for (const target of targets) {
    const outputPath = path.join(publicDir, target.name);
    await sharp(sourceImage)
      .resize(target.size, target.size)
      .png({ quality: 100 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`Generated: ${target.name} (${target.size}x${target.size}) — ${(stats.size / 1024).toFixed(1)} KB`);
  }

  console.log('All Circular Favicons & PWA Icons Generated Successfully!');
}

generatePwaIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
