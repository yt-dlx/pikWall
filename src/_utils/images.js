const fs = require("fs");
const path = require("path");

const outputFile = path.join(__dirname, "folders.json");
const imagesDir = path.join(__dirname, "public", "images", "done");

function getFoldersAndFiles(dir) {
  const files = fs.readdirSync(dir);
  const items = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      items.push({
        name: file,
        type: "folder",
        subfolders: getFoldersAndFiles(filePath),
      });
    } else if (path.extname(file) === ".png") {
      items.push({
        name: file,
        type: "file",
        path: filePath,
      });
    }
  });

  return items;
}

const folderStructure = {
  folder: "images",
  subfolders: getFoldersAndFiles(imagesDir),
};

fs.writeFileSync(outputFile, JSON.stringify(folderStructure, null, 2), "utf8");
console.log(`Folder structure has been written to ${outputFile}`);
