import { NextRequest, NextResponse } from "next/server";

const owner = "yt-dlx";
const repo = "picbook";
const branch = "picness";
const token = "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";

// Construct GitHub API URL for file content
function constructApiUrl(fileName: string): string {
  return `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(fileName)}?ref=${branch}`;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get("filename");
  const source = searchParams.get("source") || "raw";

  if (!fileName) {
    return new NextResponse("Filename is required as a query parameter.", { status: 400 });
  }

  if (source !== "raw" && source !== "preview") {
    return new NextResponse('Invalid source parameter. Use "raw" or "preview".', { status: 400 });
  }

  try {
    const apiUrl = constructApiUrl(fileName);
    console.log(`Fetching file from GitHub API: ${apiUrl}`);

    // Fetch file content via GitHub API
    const fileResponse = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!fileResponse.ok) {
      console.error(`Failed to fetch the file. Status: ${fileResponse.status}`);
      throw new Error(`Failed to fetch the file: ${fileName}`);
    }

    const fileData = await fileResponse.json();

    if (source === "preview") {
      // Decode Base64 content for preview
      const base64 = fileData.content; // Content from GitHub API is already Base64-encoded
      const contentType = fileData.encoding === "base64" ? fileData.type : "application/octet-stream";
      console.log(`Serving Base64 content for file: ${fileName}`);
      return NextResponse.json({ base64: `data:${contentType};base64,${base64}` });
    }

    // Decode Base64 content for raw download
    const buffer = Buffer.from(fileData.content, "base64");
    console.log(`Serving raw file: ${fileName}`);
    return new NextResponse(buffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": "application/octet-stream"
      }
    });
  } catch (error) {
    console.error(`Error fetching file ${fileName}:`, error);
    return new NextResponse(`Error fetching file: ${fileName}`, { status: 500 });
  }
}
