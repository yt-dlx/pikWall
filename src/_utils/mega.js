import path from "path";
import colors from "colors";
import dotenv from "dotenv";
import fs from "fs/promises";
import readline from "readline";
import { Storage } from "megajs";

let megaStorage;
dotenv.config({ path: path.join("./.env.local") });
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (query) => new Promise((resolve) => rl.question(colors.yellow(query), resolve));

async function initializeMega() {
  try {
    console.log(colors.blue("Initializing MEGA storage..."));
    megaStorage = new Storage({ keepalive: true, email: process.env.MEGA_EMAIL, password: process.env.MEGA_PASSWORD });
    await new Promise((resolve, reject) => {
      megaStorage.on("ready", resolve);
      megaStorage.on("error", reject);
    });
    console.log(colors.green("MEGA storage initialized successfully."));
    if (!megaStorage.root) throw new Error("MEGA storage root is not accessible.");
    console.log(colors.green("MEGA storage root accessed successfully."));
  } catch (error) {
    console.error(colors.red("Failed to initialize MEGA storage:"), error.message);
    console.error(colors.red("Stack trace:"), error.stack);
  }
}

async function uploadFile(artStyle, colorScheme, filePath, description) {
  try {
    const imageName = path.parse(filePath).name;
    const fileName = `${artStyle}-${colorScheme}-${imageName}.jpeg`;
    const descriptionFileName = `${artStyle}-${colorScheme}-${imageName}_description.txt`;
    const fileContent = await fs.readFile(filePath);
    const descriptionContent = Buffer.from(description);
    const upload = async (name, content) => {
      return new Promise((resolve, reject) => {
        const uploadStream = megaStorage.upload({ name, target: megaStorage.root }, content);
        uploadStream.on("complete", () => {
          console.log(colors.green(`File ${colors.bold(name)} uploaded successfully.`));
          resolve();
        });
        uploadStream.on("error", (err) => {
          console.error(colors.red(`Error uploading ${name}:`), err.message);
          reject(err);
        });
      });
    };
    await upload(fileName, fileContent);
    await upload(descriptionFileName, descriptionContent);
  } catch (error) {
    console.error(colors.red("Error uploading file:"), error.message);
    console.error(colors.red("Stack trace:"), error.stack);
  }
}

async function getFiles() {
  try {
    const files = {};
    for (const child of megaStorage.root.children || []) {
      if (child.directory) continue;
      const match = child.name.match(/^(.*?)-(.*?)-(.*?)(?:_description)?\.(jpeg|txt)$/);
      if (match) {
        const [, artStyle, colorScheme, imageName, ext] = match;
        files[artStyle] = files[artStyle] || {};
        files[artStyle][colorScheme] = files[artStyle][colorScheme] || {};
        let index = Object.keys(files[artStyle][colorScheme]).find((key) => files[artStyle][colorScheme][key].imageName === `${imageName}.jpeg`);
        if (!index) {
          index = `_${Object.keys(files[artStyle][colorScheme]).length + 1}_`;
          files[artStyle][colorScheme][index] = {};
        }
        if (ext === "jpeg") {
          files[artStyle][colorScheme][index].imageName = `${imageName}.jpeg`;
          files[artStyle][colorScheme][index].imageLink = await generateDownloadLink(child);
        } else if (ext === "txt") {
          files[artStyle][colorScheme][index].textName = `${imageName}_description.txt`;
          files[artStyle][colorScheme][index].textLink = await generateDownloadLink(child);
        }
      }
    }
    return files;
  } catch (error) {
    console.error(colors.red("Error fetching files:"), error.message);
    console.error(colors.red("Stack trace:"), error.stack);
  }
}

async function generateDownloadLink(fileNode) {
  return new Promise((resolve, reject) => {
    fileNode.link((err, link) => {
      if (err) reject(err);
      resolve(link);
    });
  });
}

async function deleteFile(artStyle, colorScheme, imageName) {
  try {
    const fileName = `${artStyle}-${colorScheme}-${imageName}.jpeg`;
    const descriptionFileName = `${artStyle}-${colorScheme}-${imageName}_description.txt`;
    const deleteFile = async (name) => {
      return new Promise((resolve, reject) => {
        const fileNode = megaStorage.root.children.find((child) => child.name === name);
        if (!fileNode) {
          console.log(colors.yellow(`File ${colors.bold(name)} not found.`));
          resolve();
          return;
        }
        fileNode.remove((err) => {
          if (err) reject(err);
          console.log(colors.green(`File ${colors.bold(name)} deleted successfully.`));
          resolve();
        });
      });
    };
    await deleteFile(fileName);
    await deleteFile(descriptionFileName);
  } catch (error) {
    console.error(colors.red("Error deleting file:"), error.message);
    console.error(colors.red("Stack trace:"), error.stack);
  }
}

async function main() {
  await initializeMega();
  while (true) {
    console.log(colors.cyan("\n===== StoryWall File Management ====="));
    console.log(colors.magenta("1. Get files"));
    console.log(colors.magenta("2. Upload file"));
    console.log(colors.magenta("3. Delete file"));
    console.log(colors.magenta("4. Exit"));
    const choice = await question(colors.blue("Enter your choice: "));
    try {
      switch (choice) {
        case "1":
          const files = await getFiles();
          console.dir(files, { depth: null, colors: true });
          break;
        case "2":
          const artStyle = await question("Enter art style: ");
          const colorScheme = await question("Enter color scheme: ");
          const filePath = await question("Enter file path: ");
          const description = await question("Enter file description: ");
          await uploadFile(artStyle, colorScheme, filePath, description);
          break;
        case "3":
          const deleteArtStyle = await question("Enter art style: ");
          const deleteColorScheme = await question("Enter color scheme: ");
          const deleteImageName = await question("Enter image name (without extension): ");
          await deleteFile(deleteArtStyle, deleteColorScheme, deleteImageName);
          break;
        case "4":
          console.log(colors.red("Exiting..."));
          rl.close();
          process.exit(0);
        default:
          console.log(colors.red("Invalid choice. Please try again."));
      }
    } catch (error) {
      console.error(colors.red("Fatal error:"), error.message);
      console.error(colors.red("Stack trace:"), error.stack);
    }
  }
}

main().catch((error) => console.error(colors.red("Error:", error.message)));
