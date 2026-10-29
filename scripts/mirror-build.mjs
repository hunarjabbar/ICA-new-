import fs from 'node:fs';
import path from 'node:path';

const distPath = path.join(process.cwd(), 'dist');
const buildPath = path.join(process.cwd(), 'build');

if (!fs.existsSync(distPath)) {
  console.error('❌ dist directory not found! Cannot mirror build.');
  process.exit(1);
}

// Clean or create build directory
if (fs.existsSync(buildPath)) {
  fs.rmSync(buildPath, { recursive: true, force: true });
}
fs.mkdirSync(buildPath, { recursive: true });

// Copy everything from dist to build recursively
fs.cpSync(distPath, buildPath, { recursive: true });

// Copy index.html to 404.html in dist and build for SPA fallback on GitHub Pages / static hosting
if (fs.existsSync(path.join(distPath, 'index.html'))) {
  fs.copyFileSync(path.join(distPath, 'index.html'), path.join(distPath, '404.html'));
}
if (fs.existsSync(path.join(buildPath, 'index.html'))) {
  fs.copyFileSync(path.join(buildPath, 'index.html'), path.join(buildPath, '404.html'));
}

// Ensure legacy chunk alias exists for CulturalExchangeLanding-Cl-hmI6h.js
try {
  const distAssets = path.join(distPath, 'assets');
  const buildAssets = path.join(buildPath, 'assets');
  if (fs.existsSync(distAssets)) {
    const files = fs.readdirSync(distAssets);
    const activeChunk = files.find(f => f.startsWith('CulturalExchangeLanding-') && f.endsWith('.js'));
    if (activeChunk) {
      fs.copyFileSync(path.join(distAssets, activeChunk), path.join(distAssets, 'CulturalExchangeLanding-Cl-hmI6h.js'));
      if (fs.existsSync(buildAssets)) {
        fs.copyFileSync(path.join(distAssets, activeChunk), path.join(buildAssets, 'CulturalExchangeLanding-Cl-hmI6h.js'));
      }
    }
  }
} catch (e) {
  console.warn('Notice: Could not write legacy chunk alias:', e);
}

console.log('✅ Successfully mirrored dist build artifacts into build directory!');
