const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a 32x32 favicon
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext('2d');

// Draw a simple paw icon
ctx.fillStyle = '#FF6B6B';
ctx.beginPath();
ctx.arc(16, 16, 8, 0, Math.PI * 2);
ctx.fill();

// Save the favicon
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./assets/images/favicon.png', buffer); 