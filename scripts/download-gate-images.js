const https = require("https");
const fs = require("fs");
const path = require("path");

const gateImages = [
  {
    name: "bab-boujloud",
    url: "https://images.unsplash.com/photo-1548017860-48fc112185c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "bab-ftouh",
    url: "https://images.unsplash.com/photo-1547636780-e41778614c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "bab-rcif",
    url: "https://images.unsplash.com/photo-1557632401-4b98920db36c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "bab-guissa",
    url: "https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "bab-semmarine",
    url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "bab-mahrouk",
    url: "https://images.unsplash.com/photo-1535372790083-459d5d907c08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "fallback",
    url: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  },
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      "gates",
      filename
    );

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(imagePath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`Downloaded: ${filename}`);
          resolve();
        });

        fileStream.on("error", (err) => {
          fs.unlink(imagePath, () => reject(err));
        });
      })
      .on("error", reject);
  });
};

async function downloadAllImages() {
  // Create directories if they don't exist
  const gatesDir = path.join(__dirname, "..", "public", "images", "gates");
  if (!fs.existsSync(gatesDir)) {
    fs.mkdirSync(gatesDir, { recursive: true });
  }

  // Download all images
  for (const image of gateImages) {
    try {
      await downloadImage(image.url, `${image.name}.jpg`);
    } catch (error) {
      console.error(`Error downloading ${image.name}:`, error.message);
    }
  }
}

downloadAllImages()
  .then(() => console.log("All images downloaded successfully!"))
  .catch(console.error);
