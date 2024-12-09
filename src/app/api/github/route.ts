// src/app/api/github/route.ts
import path from "path";
import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from "next/server";

const owner = "yt-dlx";
const branch = "images";
const repo = "picbook";
const tempBuffers: { [key: string]: Buffer[] } = {};
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function getTreeSha() {
  const { data } = await octokit.git.getRef({ owner, repo, ref: `heads/${branch}` });
  return data.object.sha;
}
async function getImageUrl(path: string) {
  const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
  if (Array.isArray(data)) throw new Error("Path is a directory");
  return data.download_url;
}
function sanitizePath(path: string) {
  const parts = path.split("/");
  const fileName = parts.pop() || "";
  const [name, extension] = fileName.split(".");
  const sanitizedName = name
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const sanitizedPath = parts
    .map((part) =>
      part
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
    )
    .join("/");
  return `${sanitizedPath}/${sanitizedName}${extension ? `.${extension.toLowerCase()}` : ""}`;
}

export async function GET(req: NextRequest) {
  const treeSha = await getTreeSha();
  const { data } = await octokit.git.getTree({ owner, repo, tree_sha: treeSha, recursive: "true" });
  const rootStructure = { Topic: "images", parent: [] as any[] };
  for (const item of data.tree) {
    if (item.type === "blob" && item.path && item.path.startsWith("images/")) {
      const parts = item.path.split("/");
      if (parts.length === 4) {
        const [_, artStyle, colorScheme, imageName] = parts;
        let parentFolder = rootStructure.parent.find((f) => f.ArtStyle === artStyle);
        if (!parentFolder) {
          parentFolder = { ArtStyle: artStyle, type: "folder", ColorScheme: [] };
          rootStructure.parent.push(parentFolder);
        }
        let colorSchemeFolder = parentFolder.ColorScheme.find((f: { name: string }) => f.name === colorScheme);
        if (!colorSchemeFolder) {
          colorSchemeFolder = { name: colorScheme, type: "folder", images: [] };
          parentFolder.ColorScheme.push(colorSchemeFolder);
        }
        const imageUrl = await getImageUrl(item.path);
        const { data } = await octokit.repos.listCommits({ owner, repo, path: item.path, sha: branch, per_page: 1 });
        colorSchemeFolder.images.push({ name: imageName, type: path.extname(item.path).toLowerCase(), paths: imageUrl, commitMessage: data[0].commit.message });
      }
    }
  }
  return NextResponse.json(rootStructure);
}
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const artStyle = formData.get("artStyle") as string;
  const colorScheme = formData.get("colorScheme") as string;
  const commitMessage = formData.get("commitMessage") as string;
  const chunk = formData.get("chunk") as File;
  const chunkIndex = parseInt(formData.get("chunkIndex") as string, 10);
  const totalChunks = parseInt(formData.get("totalChunks") as string, 10);
  const imageName = formData.get("imageName") as string;
  const sanitizedPath = sanitizePath(`images/${artStyle}/${colorScheme}/${imageName}`);
  const buffer = Buffer.from(await chunk.arrayBuffer());
  if (!tempBuffers[sanitizedPath]) tempBuffers[sanitizedPath] = [];
  tempBuffers[sanitizedPath][chunkIndex] = buffer;
  if (tempBuffers[sanitizedPath].length === totalChunks && tempBuffers[sanitizedPath].every(Boolean)) {
    const fileContent = Buffer.concat(tempBuffers[sanitizedPath]);
    const content = fileContent.toString("base64");
    await octokit.repos.createOrUpdateFileContents({ owner, repo, path: sanitizedPath, message: commitMessage, content, branch });
    delete tempBuffers[sanitizedPath];
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: true });
}
export async function DELETE(req: NextRequest) {
  async function deleteFolder(path: string) {
    try {
      const { data: contents } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
      if (Array.isArray(contents)) {
        for (const file of contents) {
          if (file.type === "file") {
            await octokit.repos.deleteFile({ owner, repo, path: file.path, message: `Delete ${file.path}`, sha: file.sha, branch });
          } else if (file.type === "dir") await deleteFolder(file.path);
        }
      }
    } catch (error: any) {
      console.error("Error deleting subfolder:", error);
      throw new Error(`Failed to delete folder: ${path} - ${error.message}`);
    }
  }
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const isFolder = searchParams.get("isFolder") === "true";
  if (!path) return NextResponse.json({ error: "Path is required" }, { status: 400 });
  if (isFolder) {
    try {
      const { data: contents } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
      if (!Array.isArray(contents)) return NextResponse.json({ error: "Invalid folder path or folder is empty" }, { status: 400 });
      for (const file of contents) {
        if (file.type === "file") await octokit.repos.deleteFile({ owner, repo, path: file.path, message: `Delete ${file.path}`, sha: file.sha, branch });
        else if (file.type === "dir") await deleteFolder(file.path);
      }
    } catch (error: any) {
      console.error("Error deleting folder:", error);
      return NextResponse.json({ error: `Failed to delete folder: ${error.message}` }, { status: 500 });
    }
  } else {
    try {
      const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
      if (Array.isArray(data)) return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
      await octokit.repos.deleteFile({ owner, repo, path, message: `Delete ${path}`, sha: data.sha, branch });
    } catch (error: any) {
      console.error("Error deleting file:", error);
      return NextResponse.json({ error: `Failed to delete file: ${error.message}` }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
