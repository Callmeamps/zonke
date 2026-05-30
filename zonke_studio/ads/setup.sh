#!/bin/bash
# Setup script for Zonke Ad Renderer
# Run this once to install dependencies

echo "Installing Zonke Ad Renderer dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Installation complete!"
    echo ""
    echo "Next steps:"
    echo "  1. Preview a template: open templates/a-system-override.html"
    echo "  2. Render first batch: node batch-render.js batch-config-initial.json"
    echo "  3. Find images in: build/"
    echo ""
    echo "See README.md for detailed documentation."
else
    echo "Installation failed. Ensure Node.js 18+ is installed."
    exit 1
fi
