const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (f === 'page.tsx' || f === 'layout.tsx') {
      const content = fs.readFileSync(full, 'utf8');
      const titleMatches = [...content.matchAll(/title:\s*["'`](.*?)["'`]/g)];
      const descMatches = [...content.matchAll(/description:\s*["'`](.*?)["'`]/g)];
      
      const relPath = path.relative(process.cwd(), full);
      console.log(`=== ${relPath} ===`);
      titleMatches.forEach(m => console.log(`  TITLE: "${m[1]}"`));
      descMatches.forEach(m => console.log(`  DESC:  "${m[1]}"`));
    }
  }
}

walk('./src/app');
