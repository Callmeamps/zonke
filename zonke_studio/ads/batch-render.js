#!/usr/bin/env node

/**
 * Batch renderer for Zonke ad creatives
 * Reads a JSON config file and renders all specified creatives
 */

const { renderHtmlToPng } = require('./render');
const fs = require('fs');
const path = require('path');

async function batchRender(configPath) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log(`\n Starting batch render: ${config.name || 'Unnamed batch'}\n`);

  for (const item of config.creatives) {
    try {
      const htmlPath = path.join(__dirname, 'templates', item.template);
      const outputPath = path.join(__dirname, 'build', item.output);

      // Ensure output directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      await renderHtmlToPng(htmlPath, item.width, item.height, outputPath);
    } catch (err) {
      console.error(` Error rendering ${item.template}:`, err.message);
    }
  }

  console.log(' Batch render complete.\n');
}

// CLI usage
if (require.main === module) {
  const [,, configPath] = process.argv;

  if (!configPath) {
    console.error(`
Usage: node batch-render.js <config.json>

Example config.json:
{
  "name": "Instagram Feed - Real Estate",
  "creatives": [
    {
      "template": "a-system-override.html",
      "width": 1080,
      "height": 1080,
      "output": "insta-feed/realestate-a.png"
    }
  ]
}
    `);
    process.exit(1);
  }

  batchRender(configPath).catch(err => {
    console.error('Batch render failed:', err);
    process.exit(1);
  });
}

module.exports = { batchRender };
