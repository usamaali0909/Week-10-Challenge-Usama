const fs = require('fs');
const { createCanvas } = require('canvas');
const SVG = require('svg.js');
const opn = require('opn');

function generateLogo(text, textColor, shape, shapeColor) {
    // Create an SVG canvas using svg.js and canvas
    const canvas = createCanvas(300, 200);
    const draw = SVG(canvas);

    // Draw text on the canvas
    draw.text(text).font({ size: 20, fill: textColor }).move(10, 30);

    // Draw shape based on user input
    if (shape === 'circle') {
        draw.circle(100).fill(shapeColor).move(100, 50);
    } else if (shape === 'triangle') {
        const trianglePoints = '150,50 100,150 200,150';
        draw.polygon(trianglePoints).fill(shapeColor);
    } else if (shape === 'square') {
        draw.rect(100, 100).fill(shapeColor).move(100, 50);
    }

    // Save the SVG to a file
    fs.writeFileSync('logo.svg', draw.svg());

    // Open the generated SVG file
    opn('logo.svg');
}

// Command-line argument parsing
const args = process.argv.slice(2);
if (args.length !== 4) {
    console.error('Usage: node script.js <text> <textColor> <shape> <shapeColor>');
    process.exit(1);
}

// Extract arguments
const [text, textColor, shape, shapeColor] = args;

// Generate and display the logo
generateLogo(text, textColor, shape, shapeColor);

// User Feedback
console.log('Generated logo.svg');
