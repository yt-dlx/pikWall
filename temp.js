const fs = require("fs");

function decodeAndRemoveThe(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);
  if (data.environments) {
    for (const environment of data.environments) {
      for (const image of environment.images) {
        if (image.downloadLink) {
          const decodedDownload = Buffer.from(image.downloadLink, "base64").toString("utf-8");
          const modifiedDownload = decodedDownload.replace(/The /g, "");
          image.downloadLink = Buffer.from(modifiedDownload, "utf-8").toString("base64");
        }
        if (image.previewLink) {
          const decodedPreview = Buffer.from(image.previewLink, "base64").toString("utf-8");
          const modifiedPreview = decodedPreview.replace(/The /g, "");
          image.previewLink = Buffer.from(modifiedPreview, "utf-8").toString("base64");
        }
      }
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
decodeAndRemoveThe("./package/app/data/database.ts");
