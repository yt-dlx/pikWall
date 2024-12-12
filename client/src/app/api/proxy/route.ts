// src/app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

const repo = process.env.GITHUB_REPO;
const token = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_OWNER;
const branch = process.env.GITHUB_BRANCH;
const rawBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`;

function constructFileUrl(fileName: string): string {
  return rawBaseUrl + encodeURIComponent(fileName);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get("filename");
  const source = searchParams.get("source");
  if (!fileName) return new NextResponse("Filename is required as a query parameter.", { status: 400 });
  try {
    const fileUrl = constructFileUrl(fileName);
    const fileResponse = await fetch(fileUrl, { headers: { Authorization: `token ${token}` } });
    if (!fileResponse.ok) throw new Error(`Failed to fetch the file: ${fileName}`);
    const arrayBuffer = await fileResponse.arrayBuffer();
    if (source === "preview") {
      const base64String = Buffer.from(arrayBuffer).toString("base64");
      const mimeType = fileResponse.headers.get("content-type") || "application/octet-stream";
      const base64Response = `data:${mimeType};base64,${base64String}`;
      return new NextResponse(base64Response, { headers: { "Content-Type": "text/plain" } });
    }
    return new NextResponse(Buffer.from(arrayBuffer), { headers: { "Content-Disposition": `attachment; filename="${fileName}"`, "Content-Type": "application/octet-stream" } });
  } catch (error) {
    console.error(`Error fetching file ${fileName}:`, error);
    return new NextResponse(`Error fetching file: ${fileName}`, { status: 500 });
  }
}
