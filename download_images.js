const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    // Logos
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/LaLiga_logo_2023.svg/1200px-LaLiga_logo_2023.svg.png',
        filename: 'laliga-logo.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png',
        filename: 'real-madrid-logo.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Atletico_Madrid_Logo_2024.svg/1200px-Atletico_Madrid_Logo_2024.svg.png',
        filename: 'atletico-madrid-logo.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
        filename: 'barcelona-logo.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Club_Athletic_Bilbao_logo.svg/1200px-Club_Athletic_Bilbao_logo.svg.png',
        filename: 'athletic-bilbao-logo.png'
    },
    // Player Images
    {
        url: 'https://images.openai.com/thumbnails/c6fbf272b31adb9e083964de6f287c23.jpeg',
        filename: 'jude-bellingham.png'
    },
    {
        url: 'https://b.fssta.com/uploads/application/soccer/headshots/2100.png',
        filename: 'robert-lewandowski.png'
    },
    {
        url: 'https://img.uefa.com/imgml/TP/players/1/2025/cutoff/250019498.webp',
        filename: 'antoine-griezmann.png'
    },
    // Background Image
    {
        url: 'https://www.fcbarcelona.com/photo-resources/2022/11/08/f28320ee-2b9d-4624-9ec9-d57a10c5c987/Osasuna_FCB-135.JPG?width=1200&height=750',
        filename: 'laliga-background.jpg'
    }
];

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Clean up old images first
const oldImages = fs.readdirSync(imagesDir);
oldImages.forEach(file => {
    fs.unlinkSync(path.join(imagesDir, file));
    console.log(`Deleted old image: ${file}`);
});

// Download each image
images.forEach(image => {
    const file = fs.createWriteStream(path.join(imagesDir, image.filename));
    https.get(image.url, response => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${image.filename}`);
        });
    }).on('error', err => {
        fs.unlink(path.join(imagesDir, image.filename));
        console.error(`Error downloading ${image.filename}: ${err.message}`);
    });
}); 