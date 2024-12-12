import { NextRequest, NextResponse } from "next/server";

const repo = process.env.GITHUB_REPO;
const token = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_OWNER;
const branch = process.env.GITHUB_BRANCH;

function constructApiUrl(fileName: string): string {
  return `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(fileName)}?ref=${branch}`;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get("filename");
  if (!fileName) return new NextResponse("Filename is required as a query parameter.", { status: 400 });
  try {
    const apiUrl = constructApiUrl(fileName);
    console.log(`Fetching file from GitHub API: ${apiUrl}`);
    const fileResponse = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } });
    if (!fileResponse.ok) throw new Error(`Failed to fetch the file: ${fileName}`);
    const fileData = await fileResponse.json();
    const buffer = Buffer.from(fileData.content, "base64");
    console.log(`Serving raw file: ${fileName}`);
    return new NextResponse(buffer, { headers: { "Content-Disposition": `attachment; filename="${fileName}"`, "Content-Type": "application/octet-stream" } });
  } catch (error) {
    console.error(`Error fetching file ${fileName}:`, error);
    return new NextResponse(`Error fetching file: ${fileName}`, { status: 500 });
  }
}
