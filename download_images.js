const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    {
        url: 'https://cricketpremi.com/wp-content/uploads/2025/02/TPL-Image.jpg',
        filename: 'ipl-background.jpg'
    }
];

// Create images directory if it doesn't exist
if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
}

function downloadImage(image, retryCount = 0) {
    const maxRetries = 3;
    const timeout = 10000; // 10 seconds timeout

    const file = fs.createWriteStream(path.join('images', image.filename));
    const request = https.get(image.url, { timeout }, (response) => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${image.filename}`);
            });
        } else {
            console.error(`Failed to download ${image.filename}: Status code ${response.statusCode}`);
            try {
                fs.unlinkSync(path.join('images', image.filename));
            } catch (err) {
                console.error(`Error removing file ${image.filename}: ${err.message}`);
            }
            if (retryCount < maxRetries) {
                console.log(`Retrying ${image.filename} (attempt ${retryCount + 1}/${maxRetries})...`);
                setTimeout(() => downloadImage(image, retryCount + 1), 2000);
            }
        }
    });

    request.on('error', (err) => {
        console.error(`Error downloading ${image.filename}: ${err.message}`);
        try {
            fs.unlinkSync(path.join('images', image.filename));
        } catch (err) {
            console.error(`Error removing file ${image.filename}: ${err.message}`);
        }
        if (retryCount < maxRetries) {
            console.log(`Retrying ${image.filename} (attempt ${retryCount + 1}/${maxRetries})...`);
            setTimeout(() => downloadImage(image, retryCount + 1), 2000);
        }
    });

    request.on('timeout', () => {
        request.destroy();
        console.error(`Timeout downloading ${image.filename}`);
        if (retryCount < maxRetries) {
            console.log(`Retrying ${image.filename} (attempt ${retryCount + 1}/${maxRetries})...`);
            setTimeout(() => downloadImage(image, retryCount + 1), 2000);
        }
    });

    request.end();
}

// Download the background image
downloadImage(images[0]); 