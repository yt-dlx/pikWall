//  ==================================================XXX==================================================
//  This Code Is Used To Download The Final Files From GitHub
//  ==================================================XXX==================================================
import fetch from "node-fetch";

const getData = async () => {
  const response = await fetch("https://api.github.com/repos/yt-dlx/wallpaper/git/trees/cron?recursive=1");
  if (response.ok) {
    const data = await response.json();
    const files = data.tree;
    const jpgFiles = files.filter((file) => file.path.endsWith(".jpg"));
    const jsonFiles = files.filter((file) => file.path.endsWith(".json"));
    const groupedFiles = {};
    jpgFiles.forEach((file) => {
      const baseName = file.path.split("(").slice(0, -1).join("(").trim();
      const version = file.path.match(/\((\d+)\)/);
      if (version) {
        const fullBaseName = `${baseName} (${version[1]})`;
        if (!groupedFiles[fullBaseName]) groupedFiles[fullBaseName] = { jpg: [], json: [] };
        groupedFiles[fullBaseName].jpg.push(file.path);
      }
    });
    jsonFiles.forEach((file) => {
      const baseName = file.path.split("(").slice(0, -1).join("(").trim();
      const version = file.path.match(/\((\d+)\)/);
      if (version) {
        const fullBaseName = `${baseName} (${version[1]})`;
        if (!groupedFiles[fullBaseName]) groupedFiles[fullBaseName] = { jpg: [], json: [] };
        groupedFiles[fullBaseName].json.push(file.path);
      }
    });
    const database = Object.keys(groupedFiles).map((baseName) => {
      const { jpg, json } = groupedFiles[baseName];
      return {
        baseName,
        files: {
          json: json.map((name) => ({
            fileName: name,
            downloadLink: decodeURIComponent(`https://github.com/yt-dlx/wallpaper/raw/images/${name}`),
            previewLink: decodeURIComponent(`https://raw.githubusercontent.com/yt-dlx/wallpaper/images/${name}`)
          })),
          jpg: jpg.map((name) => ({
            fileName: name,
            downloadLink: decodeURIComponent(`https://github.com/yt-dlx/wallpaper/raw/images/${name}`),
            previewLink: decodeURIComponent(`https://raw.githubusercontent.com/yt-dlx/wallpaper/images/${name}`)
          }))
        }
      };
    });
    console.log(database);
  } else console.log(`Failed to fetch repository contents. Status code: ${response.status}`);
};

getData();
//  ==================================================XXX==================================================
