const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generatePngVariants() {
  const logosDir = path.join(__dirname, '..', 'public', 'logos');

  const targets = [
    {
      svgFile: path.join(logosDir, 'Kinstel-Solutions_logo.svg'),
      prefix: 'Kinstel-Solutions_logo',
    },
    {
      svgFile: path.join(logosDir, 'Kinstel-Solutions_logo-LightTheme.svg'),
      prefix: 'Kinstel-Solutions_logo-LightTheme',
    },
  ];

  const widths = [400, 800, 1200, 2400];

  console.log('Starting PNG Logo Variant Generation...');

  for (const target of targets) {
    if (!fs.existsSync(target.svgFile)) {
      console.error(`File not found: ${target.svgFile}`);
      continue;
    }

    const svgBuffer = fs.readFileSync(target.svgFile);

    for (const width of widths) {
      const outputFile = path.join(logosDir, `${target.prefix}-${width}px.png`);

      await sharp(svgBuffer)
        .resize({ width: width })
        .png({ compressionLevel: 9, quality: 100 })
        .toFile(outputFile);

      const stats = fs.statSync(outputFile);
      console.log(`Generated: ${path.basename(outputFile)} (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  }

  console.log('PNG Logo Variant Generation Completed Successfully!');
}

generatePngVariants().catch((err) => {
  console.error('Error generating PNG variants:', err);
  process.exit(1);
});
