const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (f === 'page.tsx' || f === 'layout.tsx' || f === 'route.ts') {
      const content = fs.readFileSync(full, 'utf8');
      const relPath = path.relative(process.cwd(), full);
      
      const hasTitle = content.includes('title:');
      const hasDesc = content.includes('description:');
      const hasH1 = content.includes('<h1');

      if (hasTitle || hasDesc || hasH1) {
        console.log(`\n========================================`);
        console.log(`FILE: ${relPath}`);
        
        // Extract title
        const titles = [...content.matchAll(/title:\s*["'`](.*?)["'`]/g)];
        titles.forEach(m => {
          const hasBrand = m[1].includes('Kinstel');
          console.log(`  TITLE [Brand:${hasBrand}]: "${m[1]}"`);
        });

        // Extract description
        const descs = [...content.matchAll(/description:\s*["'`](.*?)["'`]/g)];
        descs.forEach(m => {
          const hasBrand = m[1].includes('Kinstel');
          console.log(`  DESC  [Brand:${hasBrand}]: "${m[1]}"`);
        });
      }
    }
  }
}

walk('./src/app');
