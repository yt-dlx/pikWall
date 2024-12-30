import { join } from "path";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { readFileSync, readdirSync, statSync } from "fs";
dotenv.config({ path: ".env" });
const owner = "yt-dlx";
const repo = "picWall";
const branch = "highRes";
const commitMessage = "picWall™ AI";
const token = process.env.GITHUB_TOKEN;
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/`;
function getDirectories(basePath) {
  return readdirSync(basePath)
    .map((folder) => join(basePath, folder, "highRes"))
    .filter((path) => statSync(path).isDirectory());
}
const directories = getDirectories("./sources/output");
async function fetchUploadedFiles() {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, {
      headers: { Authorization: `token ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      const files = data.tree;
      return new Set(files.map((file) => file.path.split("/").pop()));
    } else {
      console.error(`ERROR: Failed to fetch repository contents: ${response.status}`);
      return new Set();
    }
  } catch (error) {
    console.error("ERROR: Error fetching uploaded files:", error.message);
    return new Set();
  }
}
async function uploadFileToGitHub(filePath, fileName) {
  const content = readFileSync(filePath, "base64");
  try {
    const response = await fetch(`${apiUrl}${fileName}`, {
      method: "PUT",
      headers: { Authorization: `token ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message: commitMessage, content, branch })
    });
    if (response.ok) console.log(`INFO: File uploaded successfully: ${fileName}`);
    else console.warn(`WARNING: Unexpected response for ${fileName}: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error(`ERROR: Error uploading ${fileName}:`, error.message);
  }
}
function sortFiles(files) {
  return files.sort((a, b) => {
    const baseNameA = a.match(/^(.*)\s\((\d+)\)\.\w+$/);
    const baseNameB = b.match(/^(.*)\s\((\d+)\)\.\w+$/);
    if (baseNameA && baseNameB) {
      const [_, nameA, numA] = baseNameA;
      const [__, nameB, numB] = baseNameB;
      if (nameA === nameB) return parseInt(numA) - parseInt(numB);
      return nameA.localeCompare(nameB);
    }
    return a.localeCompare(b);
  });
}
async function uploadFilesFromDirectory(directory) {
  try {
    const uploadedFileNames = await fetchUploadedFiles();
    const localFiles = readdirSync(directory);
    const filesToUpload = sortFiles(localFiles.filter((file) => !uploadedFileNames.has(file)));
    for (const file of filesToUpload) {
      const filePath = join(directory, file);
      await uploadFileToGitHub(filePath, file);
    }
  } catch (error) {
    console.error(`ERROR: Error during file upload process for directory ${directory}:`, error.message);
  }
}
async function uploadAllDirectories() {
  for (const directory of directories) {
    await uploadFilesFromDirectory(directory);
  }
}
uploadAllDirectories()
  .then(() => console.log("INFO: File upload process finished successfully."))
  .catch((error) => console.error("ERROR: Error during file upload process:", error.message));
