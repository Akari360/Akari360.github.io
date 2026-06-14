const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createThumbnails() {
    try {
        const toursBaseDir = path.join(__dirname, 'tours');

        // Safety check if the main 'tours' directory exists
        if (!fs.existsSync(toursBaseDir)) {
            console.log(`❌ Error: Could not find the main 'tours' directory at ${toursBaseDir}`);
            return;
        }

        // 📂 Dynamically read all items inside the 'tours' folder
        const items = fs.readdirSync(toursBaseDir);
        
        // Filter out files (like readme or system files) and only keep actual project folders
        const tourFolders = items.filter(item => {
            const fullPath = path.join(toursBaseDir, item);
            return fs.statSync(fullPath).isDirectory();
        });

        console.log(`🚀 Found ${tourFolders.length} project folders to scan...`);

        for (const tourFolder of tourFolders) {
            let targetFolder = path.join(toursBaseDir, tourFolder);
            
            // Handle your custom 0001 structure where images hide inside an 'assets' folder
            if (tourFolder === '0001') {
                const assetsPath = path.join(targetFolder, 'assets');
                if (fs.existsSync(assetsPath)) {
                    targetFolder = assetsPath;
                }
            }

            const files = fs.readdirSync(targetFolder);
            console.log(`\n🔍 Scanning folder: tours/${tourFolder}...`);

            let generatedCount = 0;

            for (const file of files) {
                // Look for original high-res images, completely ignore pre-existing thumbs
                if ((file.endsWith('.jpg') || file.endsWith('.jpeg')) && !file.includes('-thumb')) {
                    const inputPath = path.join(targetFolder, file);
                    
                    const outputName = file.replace(/\.(jpg|jpeg)$/i, '-thumb.jpg');
                    const outputPath = path.join(targetFolder, outputName);

                    // Only process if the thumbnail doesn't already exist
                    if (!fs.existsSync(outputPath)) {
                        console.log(`   📸 Creating thumbnail for: ${file}`);
                        
                        await sharp(inputPath)
                            .resize(400)          // Shrink width down to 400px (fast & lightweight)
                            .jpeg({ quality: 60 }) // Optimize web compression
                            .toFile(outputPath);
                            
                        generatedCount++;
                    }
                }
            }
            
            if (generatedCount === 0) {
                console.log(`   ✨ Everything up to date. No new thumbnails needed.`);
            } else {
                console.log(`   ✅ Finished! Generated ${generatedCount} new thumbnails.`);
            }
        }
        
        console.log('\n🎉 Dynamic synchronization complete! All projects are optimized.');
    } catch (error) {
        console.error('❌ Error processing images:', error);
    }
}

createThumbnails();