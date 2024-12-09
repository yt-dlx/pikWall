// src/app/api/images/route.ts
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

interface GitHubTreeItem {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size?: number;
  url: string;
}

interface GitHubTreeResponse {
  sha: string;
  url: string;
  tree: GitHubTreeItem[];
  truncated: boolean;
}

function isGitHubTreeResponse(data: any): data is GitHubTreeResponse {
  return data && typeof data.sha === "string" && typeof data.url === "string" && Array.isArray(data.tree) && typeof data.truncated === "boolean";
}
function getBaseFilename(filename: string): string {
  return filename.replace(/\.[^/.]+$/, "");
}

export async function GET(req: NextRequest) {
  try {
    const response = await fetch("https://api.github.com/repos/yt-dlx/wallpaper/git/trees/cron?recursive=1");
    if (!response.ok) return NextResponse.json({ error: "Failed to fetch repository contents" }, { status: response.status });
    const rawData = await response.json();
    if (!isGitHubTreeResponse(rawData)) return NextResponse.json({ error: "Unexpected API response format" }, { status: 500 });
    const files = rawData.tree.filter((file) => file.path.endsWith(".jpg") || file.path.endsWith(".json"));
    const fileMap: { [key: string]: { jpg?: { previewLink: string; downloadLink: string }; json?: { previewLink: string; downloadLink: string } } } = {};
    files.forEach((file) => {
      const baseFilename = getBaseFilename(file.path);
      if (!fileMap[baseFilename]) fileMap[baseFilename] = {};
      if (file.path.endsWith(".jpg")) {
        fileMap[baseFilename].jpg = {
          previewLink: `https://raw.githubusercontent.com/yt-dlx/wallpaper/cron/${file.path}`,
          downloadLink: `https://github.com/yt-dlx/wallpaper/raw/cron/${file.path}`,
        };
      } else if (file.path.endsWith(".json")) {
        fileMap[baseFilename].json = {
          previewLink: `https://raw.githubusercontent.com/yt-dlx/wallpaper/cron/${file.path}`,
          downloadLink: `https://github.com/yt-dlx/wallpaper/raw/cron/${file.path}`,
        };
      }
    });
    const database = Object.keys(fileMap).map((baseFilename) => ({ baseFilename, ...fileMap[baseFilename] }));
    return NextResponse.json(database);
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
