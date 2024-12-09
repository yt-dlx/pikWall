import fs from "fs";
import { Octokit } from "@octokit/rest";
import { basename, extname } from "path";

const octokit = new Octokit({ auth: "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" });

function sanitizeTagName(tagName) {
  let sanitized = tagName.replace(/[^a-zA-Z0-9-]/g, "-");
  sanitized = sanitized.replace(/-+/g, "-");
  sanitized = sanitized.replace(/^-|-$/g, "");
  return sanitized;
}

async function GET(owner, repo) {
  try {
    const releases = await octokit.paginate(octokit.repos.listReleases, { owner, repo });
    const releaseMap = {};
    function buildFolderStructure(parentArray, parts, assetName, assetUrl, releaseId) {
      const artStyle = parts.shift();
      let parentFolder = parentArray.find((f) => f.ArtStyle === artStyle);
      if (!parentFolder) {
        parentFolder = { ArtStyle: artStyle, type: "folder", ColorScheme: [] };
        parentArray.push(parentFolder);
      }
      const colorScheme = parts.shift();
      let colorSchemeFolder = parentFolder.ColorScheme.find((f) => f.name === colorScheme);
      if (!colorSchemeFolder) {
        colorSchemeFolder = { name: colorScheme, type: "folder", images: [] };
        parentFolder.ColorScheme.push(colorSchemeFolder);
      }
      const imageName = parts.length > 0 ? parts.join("-") : assetName;
      colorSchemeFolder.images.push({ name: imageName, type: ".png", paths: assetUrl, releaseId: releaseId });
      releaseMap[`${artStyle}-${colorScheme}-${imageName}`] = releaseId;
    }
    const rootStructure = { Topic: "images", parent: [] };
    releases.forEach((release) => {
      const sanitizedTag = sanitizeTagName(release.tag_name);
      const tagParts = sanitizedTag.split("-");
      const assetName = release.tag_name.split("-").pop();
      release.assets.forEach((asset) => {
        const assetUrl = asset.browser_download_url;
        buildFolderStructure(rootStructure.parent, [...tagParts], assetName, assetUrl, release.id);
      });
    });
    if (!rootStructure || !releaseMap) return null;
    else return rootStructure;
  } catch (error) {
    console.error("Error fetching releases:", error.message);
    return null;
  }
}

async function POST(owner, repo, artStyle, colorScheme, imagePath) {
  try {
    const imageName = basename(imagePath, extname(imagePath));
    const tagName = sanitizeTagName(`${artStyle}-${colorScheme}-${imageName}`);
    const releaseName = `${artStyle} ${colorScheme} ${imageName}`;
    const release = await octokit.repos.createRelease({ owner, repo, tag_name: tagName, name: releaseName, body: "Release created via Octokit", draft: false, prerelease: false });
    console.log("Release created successfully:", release.data.name);
    const uploadUrl = release.data.upload_url.replace("{?name,label}", `?name=${basename(imagePath)}`);
    const fileSize = fs.statSync(imagePath).size;
    const fileContent = fs.readFileSync(imagePath);
    const response = await octokit.request({ method: "POST", url: uploadUrl, headers: { "content-length": fileSize, "content-type": "application/octet-stream" }, data: fileContent });
    console.log(`Asset uploaded successfully: ${response.data.browser_download_url}`);
  } catch (error) {
    console.error("Error creating release or uploading asset:", error.message);
  }
}

async function PUT(owner, repo, releaseId, newName) {
  try {
    const response = await octokit.repos.updateRelease({ owner, repo, release_id: releaseId, name: newName });
    console.log(`Release updated successfully: ${response.data.name}`);
  } catch (error) {
    console.error("Error updating release:", error.message);
  }
}

async function DELETE(owner, repo, releaseId) {
  try {
    await octokit.repos.deleteRelease({ owner, repo, release_id: releaseId });
    console.log("Release deleted successfully");
  } catch (error) {
    console.error("Error deleting release:", error.message);
  }
}

(async () => {
  await POST("yt-dlx", "storywall", "Acrylic", "Gruvbox", "./public/images/done/Acrylic/Gruvbox/lite/Designer.png");
  const rootStructure = await GET("yt-dlx", "storywall");
  console.log(JSON.stringify(rootStructure, null, 2));
  await DELETE("yt-dlx", "storywall", releaseId);
  await PUT("yt-dlx", "storywall", releaseId, "Updated Release Name");
})();
