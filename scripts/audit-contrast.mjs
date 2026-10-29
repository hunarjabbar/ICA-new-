import * as fs from 'fs';
import * as path from 'path';

function parseHex(hex) {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function sRgbToLinear(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * sRgbToLinear(r) + 0.7152 * sRgbToLinear(g) + 0.0722 * sRgbToLinear(b);
}

function getContrastRatio(fgHex, bgHex) {
  const l1 = relativeLuminance(fgHex);
  const l2 = relativeLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const colorTokens = [
  { element: 'Primary body text on white card', fg: '#000000', bg: '#FFFFFF', threshold: 4.5, type: 'normal' },
  { element: 'Secondary muted text on white surface', fg: '#4B5563', bg: '#FFFFFF', threshold: 4.5, type: 'normal' },
  { element: 'Brand dark heading on light card', fg: '#7f0a1e', bg: '#FFFFFF', threshold: 4.5, type: 'normal' },
  { element: 'Brand white text on brand button (#991b1b)', fg: '#FFFFFF', bg: '#991B1B', threshold: 4.5, type: 'normal' },
  { element: 'White text on sovereign dark hero (#0a0a0c)', fg: '#FFFFFF', bg: '#0A0A0C', threshold: 4.5, type: 'normal' },
  { element: 'Muted grey text on dark background (#121217)', fg: '#A3A3A3', bg: '#121217', threshold: 4.5, type: 'normal' },
  { element: 'Interactive link on white background', fg: '#991B1B', bg: '#FFFFFF', threshold: 4.5, type: 'normal' },
  { element: 'Sovereign badge accent on soft red', fg: '#991B1B', bg: '#FEE2E2', threshold: 4.5, type: 'normal' },
  { element: 'Interactive input/control border on white surface', fg: '#767676', bg: '#FFFFFF', threshold: 3.0, type: 'ui' },
  { element: 'Card container boundary on light surface', fg: '#848484', bg: '#F9FAFB', threshold: 3.0, type: 'ui' },
  { element: 'Focus ring against dark surface', fg: '#CC0000', bg: '#0A0A0C', threshold: 3.0, type: 'ui' }
];

const results = colorTokens.map(token => {
  const ratio = getContrastRatio(token.fg, token.bg);
  const passed = ratio >= token.threshold;
  return {
    ...token,
    ratio: Number(ratio.toFixed(2)),
    ratioFormatted: `${ratio.toFixed(2)}:1`,
    thresholdFormatted: `${token.threshold}:1`,
    verdict: passed ? 'PASS' : 'FAIL'
  };
});

const args = process.argv.slice(2);
let outputPath = 'step7-audit/contrast/global-tokens.json';
for (const arg of args) {
  if (arg.startsWith('--output=')) outputPath = arg.replace('--output=', '');
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2) + '\n');

console.log('--- WCAG 2.1 AA COLOR CONTRAST AUDIT ---');
results.forEach(r => {
  console.log(`[${r.verdict}] ${r.element}: ${r.ratioFormatted} (Required: ${r.thresholdFormatted})`);
});
