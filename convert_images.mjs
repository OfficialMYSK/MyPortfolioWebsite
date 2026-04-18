import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDir = 'e:/Avans/PortfolioWebsite/MyPortfolioWebsite/public/images/main-page';

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (file.match(/\.(png|jpe?g)$/i)) {
            const ext = path.extname(file);
            const basename = path.basename(file, ext);
            const webpPath = path.join(dir, basename + '.webp');
            
            console.log(`Converting ${file} -> ${basename}.webp`);
            try {
                await sharp(fullPath)
                    .webp({ quality: 80, effort: 6 })
                    .toFile(webpPath);
                fs.unlinkSync(fullPath); // Original deleted
                console.log(`Successfully converted ${file}`);
            } catch (err) {
                console.error(`Failed to convert ${file}:`, err);
            }
        }
    }
}

console.log("Starting WebP Conversion Script...");
await processDirectory(targetDir).catch(console.error);
console.log("Conversion Finished!");
