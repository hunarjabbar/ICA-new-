import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

const distDir = 'dist/assets';
const chunks = [];

if (fs.existsSync(distDir)) {
  const files = fs.readdirSync(distDir);
  for (const file of files) {
    const filePath = path.join(distDir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      const content = fs.readFileSync(filePath);
      const gzipped = zlib.gzipSync(content);
      chunks.push({
        name: file,
        sizeBytes: stats.size,
        sizeKB: Number((stats.size / 1024).toFixed(2)),
        gzipBytes: gzipped.length,
        gzipKB: Number((gzipped.length / 1024).toFixed(2)),
        isJS: file.endsWith('.js'),
        isCSS: file.endsWith('.css'),
      });
    }
  }
}

chunks.sort((a, b) => b.gzipBytes - a.gzipBytes);

fs.mkdirSync('step8-audit/bundle', { recursive: true });
fs.writeFileSync('step8-audit/bundle/analyzer.json', JSON.stringify({ chunks }, null, 2) + '\n');

console.log('--- BUNDLE AUDIT REPORT ---');
console.log(`Total Chunks: ${chunks.length}`);
console.log('Top 10 chunks by gzipped size:');
chunks.slice(0, 10).forEach(c => {
  console.log(`  ${c.name}: ${c.gzipKB} KB gzipped (${c.sizeKB} KB parsed)`);
});
