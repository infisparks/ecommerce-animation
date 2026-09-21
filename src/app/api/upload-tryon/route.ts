import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import os from "os";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, filename } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ success: false, error: "No image provided" }, { status: 400 });
    }

    const safeName = filename || `tryon-${Date.now()}.jpeg`;
    const tempFilePath = path.join(os.tmpdir(), safeName);

    // Decode base64 to buffer
    let base64Data = imageBase64;
    let mimeType = "image/jpeg";
    if (imageBase64.startsWith("data:")) {
      const parts = imageBase64.split(",");
      const mimeMatch = parts[0].match(/:(.*?);/);
      if (mimeMatch) mimeType = mimeMatch[1];
      base64Data = parts[1];
    }

    const buffer = Buffer.from(base64Data, "base64");
    await fs.writeFile(tempFilePath, buffer);

    console.log(`\n☁️ [STORAGE UPLOAD] Uploading ${safeName} to storage.infispark.in...`);

    // Execute S3 SigV4 Upload via curl
    const targetUrl = `https://storage.infispark.in/app-images/${safeName}`;
    const uploadCmd = `curl -s -o /dev/null -w "%{http_code}" \
--aws-sigv4 "aws:amz:us-east-1:s3" \
--user "rbfvxvplw8y73Fk4:tnzKyzUGFoF80AhSm5dlHip8zz2s8z2j" \
-H "Content-Type: ${mimeType}" \
--upload-file "${tempFilePath}" \
"${targetUrl}"`;

    const { stdout } = await execAsync(uploadCmd);
    const statusCode = stdout.trim();

    // Clean up temp file
    try {
      await fs.unlink(tempFilePath);
    } catch {}

    if (statusCode === "200" || statusCode === "204") {
      console.log(`✅ [STORAGE UPLOAD SUCCESS] Saved at: ${targetUrl}`);
      return NextResponse.json({
        success: true,
        url: targetUrl,
      });
    } else {
      console.error(`❌ [STORAGE UPLOAD FAILED] HTTP status: ${statusCode}`);
      return NextResponse.json(
        { success: false, error: `Upload returned HTTP ${statusCode}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("❌ [STORAGE UPLOAD ERROR]:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to upload to storage" },
      { status: 500 }
    );
  }
}
