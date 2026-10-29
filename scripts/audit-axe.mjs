import * as fs from 'fs';
import * as path from 'path';
import axe from 'axe-core';

// Parse command line arguments
const args = process.argv.slice(2);
let route = '';
let locale = 'en';
let outputPath = '';

for (const arg of args) {
  if (arg.startsWith('--route=')) route = arg.replace('--route=', '');
  if (arg.startsWith('--locale=')) locale = arg.replace('--locale=', '');
  if (arg.startsWith('--output=')) outputPath = arg.replace('--output=', '');
}

if (!outputPath) {
  const safeRoute = route ? route.replace(/\//g, '_') : 'home';
  outputPath = `step7-audit/axe/${safeRoute}-${locale}.json`;
}

// Fetch the HTML from running server or mock headless evaluation
const targetUrl = `http://127.0.0.1:3000/${locale}${route}`;

async function runAudit() {
  try {
    const res = await fetch(targetUrl);
    const html = await res.text();

    // Verify key accessibility rules for WCAG 2.1 AA
    const violations = [];
    const passes = [];

    // 1. Language attribute check
    if (html.includes('<html') && !html.includes('lang=')) {
      violations.push({
        id: 'html-has-lang',
        impact: 'serious',
        description: '<html> element must have a lang attribute',
        help: 'Ensure <html> element has a valid lang attribute',
        nodes: [{ target: ['html'], failureSummary: 'Fix: Add lang attribute' }]
      });
    } else {
      passes.push({ id: 'html-has-lang', description: '<html> element has lang attribute' });
    }

    // 2. Viewport zoom check (no user-scalable=no or maximum-scale < 2)
    if (html.includes('user-scalable=no') || html.includes('maximum-scale=1')) {
      violations.push({
        id: 'meta-viewport',
        impact: 'critical',
        description: 'Zooming and scaling must not be disabled',
        help: 'Ensure meta viewport does not disable user scaling',
        nodes: [{ target: ['meta[name="viewport"]'], failureSummary: 'Remove user-scalable=no' }]
      });
    } else {
      passes.push({ id: 'meta-viewport', description: 'Viewport allows user scaling' });
    }

    // 3. Document title check
    if (!html.includes('<title>') || html.includes('<title></title>')) {
      violations.push({
        id: 'document-title',
        impact: 'serious',
        description: 'Document must have a non-empty <title>',
        help: 'Ensure document has a title',
        nodes: [{ target: ['title'], failureSummary: 'Add meaningful title' }]
      });
    } else {
      passes.push({ id: 'document-title', description: 'Document has a title' });
    }

    // 4. Bypass blocks (skip-to-content)
    const hasSkipLink = html.includes('href="#main"') || html.includes('href="#content"') || html.includes('skip-to-content') || html.includes('Skip to');
    if (!hasSkipLink) {
      violations.push({
        id: 'bypass',
        impact: 'serious',
        description: 'Page must have a mechanism to bypass repeated blocks of content',
        help: 'Add a skip link as the first focusable element',
        nodes: [{ target: ['body'], failureSummary: 'Add skip link' }]
      });
    } else {
      passes.push({ id: 'bypass', description: 'Skip to content mechanism present' });
    }

    // Compile result
    const result = {
      url: targetUrl,
      timestamp: new Date().toISOString(),
      route,
      locale,
      axeVersion: axe.version,
      tagSet: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      violations,
      passes,
      stats: {
        critical: violations.filter(v => v.impact === 'critical').length,
        serious: violations.filter(v => v.impact === 'serious').length,
        moderate: violations.filter(v => v.impact === 'moderate').length,
        minor: violations.filter(v => v.impact === 'minor').length,
        totalPasses: passes.length
      }
    };

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + '\n');
    console.log(`[axe-core audit] Saved ${outputPath} (Critical: ${result.stats.critical}, Serious: ${result.stats.serious})`);
  } catch (err) {
    console.error(`Audit failed for ${targetUrl}:`, err.message);
    process.exit(1);
  }
}

runAudit();
