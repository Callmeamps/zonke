#!/usr/bin/env node

/**
 * Zonke Ad Renderer
 * Converts HTML templates to PNG images at specified dimensions
 *
 * Usage:
 *   node render.js templates/a-system-override.html 1080 1080 build/insta-feed/a-1.png
 *   node render.js templates/b-terminal-countdown.html 1080 1920 build/insta-stories/b-1.png
 *
 * Or batch render all from a config file.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function renderHtmlToPng(htmlPath, width, height, outputPath) {
  console.log(`\n Rendering: ${htmlPath}`);
  console.log(`   Size: ${width}x${height}`);
  console.log(`   Output: ${outputPath}`);

  // Read HTML file
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Set viewport
    await page.setViewport({ width, height, deviceScaleFactor: 2 }); // 2x for retina

    // Load HTML content
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Wait for any fonts to load
    await page.waitForFunction(() => document.fonts.ready);

    // Optional: small delay for any animations to settle
    await new Promise(resolve => setTimeout(resolve, 500));

    // Take screenshot
    await page.screenshot({
      path: outputPath,
      type: 'png',
      fullPage: false,
      omitBackground: false
    });

    console.log(`✓ Rendered: ${outputPath}\n`);
  } finally {
    await browser.close();
  }
}

// CLI usage
if (require.main === module) {
  const [,, htmlPath, width, height, outputPath] = process.argv;

  if (!htmlPath || !width || !height || !outputPath) {
    console.error(`
Usage: node render.js <html-file> <width> <height> <output-file>

Example:
  node render.js templates/a-system-override.html 1080 1080 build/insta-feed/a-1.png
    `);
    process.exit(1);
  }

  renderHtmlToPng(htmlPath, parseInt(width), parseInt(height), outputPath)
    .then(() => console.log('Done.'))
    .catch(err => {
      console.error('Render failed:', err);
      process.exit(1);
    });
}

module.exports = { renderHtmlToPng };
