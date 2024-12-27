/* eslint-disable @typescript-eslint/no-unused-vars */
//  ==================================================XXX==================================================
//  This Code Is Used To Upload The Final Low-Res Files To GitHub
//  ==================================================XXX==================================================
import { join } from "path";
import dotenv from "dotenv";
import { readFileSync, readdirSync } from "fs";
import fetch from "node-fetch";
dotenv.config({ path: ".env" });
const owner = "yt-dlx";
const repo = "picbook";
const branch = "lowRes";
const commitMessage = "Add multiple files";
const token = process.env.GITHUB_TOKEN;
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/`;
const directories = ["./sources/output/Anime/lowRes", "./sources/output/Portrait/lowRes", "./sources/output/Lightning/lowRes", "./sources/output/Cinematic/lowRes", "./sources/output/Photography/lowRes"];
async function fetchUploadedFiles() {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, { headers: { Authorization: `token ${token}` } });
    if (response.ok) {
      const data = await response.json();
      const files = data.tree;
      const uploadedFileNames = files.map((file) => file.path.split("/").pop());
      console.log(`INFO: Fetched ${uploadedFileNames.length} files from GitHub.`);
      return new Set(uploadedFileNames);
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
    console.log(`INFO: Uploading file: ${fileName}`);
    const data = { message: commitMessage, content: content, branch: branch };
    const response = await fetch(`${apiUrl}${fileName}`, {
      method: "PUT",
      headers: { Authorization: `token ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (response.ok) console.log(`INFO: File uploaded successfully: ${fileName}`);
    else console.warn(`Unexpected response for ${fileName}: ${response.status} - ${response.statusText}`);
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
    console.log(`INFO: Starting file upload process for directory: ${directory}`);
    const uploadedFileNames = await fetchUploadedFiles();
    const localFiles = readdirSync(directory);
    const filesToUpload = sortFiles(localFiles.filter((file) => !uploadedFileNames.has(file)));
    for (const file of filesToUpload) {
      const filePath = join(directory, file);
      await uploadFileToGitHub(filePath, file);
    }
    console.log(`INFO: File upload process completed for directory: ${directory}`);
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
//  ==================================================XXX==================================================
