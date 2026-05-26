const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

console.log('Scanning public folder:', publicDir);

const files = fs.readdirSync(publicDir);
const bottleFiles = files.filter(file => file.startsWith('C_Bottle') || file.startsWith('S_Bottle'))
                         .filter(file => file.endsWith('.png'));

console.log(`Found ${bottleFiles.length} bottle PNGs to convert...`);

async function convert() {
  for (const file of bottleFiles) {
    const filePath = path.join(publicDir, file);
    const outputName = file.replace('.png', '.webp');
    const outputPath = path.join(publicDir, outputName);
    
    console.log(`Converting ${file} -> ${outputName}...`);
    await sharp(filePath)
      .webp({ quality: 80, effort: 6 }) // high performance compression
      .toFile(outputPath);
      
    const initialSize = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);
    const finalSize = (fs.statSync(outputPath).size / 1024).toFixed(2);
    console.log(`✅ Converted ${outputName}! Size reduced from ${initialSize}MB to ${finalSize}KB!`);
  }
  console.log('🎉 All bottles successfully converted to highly optimized WebP format!');
}

convert().catch(err => {
  console.error('❌ Conversion Error:', err);
});
