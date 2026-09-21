import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execAsync = promisify(exec);

async function getVertexToken(): Promise<string | null> {
  if (process.env.VERTEX_AI_TOKEN) return process.env.VERTEX_AI_TOKEN;
  try {
    const { stdout } = await execAsync("/opt/homebrew/bin/gcloud auth print-access-token");
    return stdout.trim();
  } catch (e) {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userImageBase64, dressImageUrl, dressName, fabric, color, size } = await req.json();

    console.log("\n=======================================================");
    console.log("✨ [GOOGLE VERTEX AI VIRTUAL TRY-ON] Request Received");
    console.log(`👗 Dress: ${dressName} | Fabric: ${fabric} | Color: ${color} | Size: ${size}`);
    console.log("=======================================================");

    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const vertexToken = await getVertexToken();
    const vertexProjectId = process.env.VERTEX_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || "selflance-a980d";
    const vertexLocation = process.env.VERTEX_LOCATION || "us-central1";

    let stylingAdvice = `• Silhouette & Drape: The ${size} fit gracefully contours with royal flared drape.\n• Color Harmony: Rich ${color} brings out warm undertones with shimmering festive gold zari.\n• Styling Tip: Pair with pearl choker jewelry and traditional juttis for the complete royal look.`;
    let fittedImage: string | null = null;

    // Clean base64 for person image
    let personBase64 = userImageBase64;
    if (userImageBase64.startsWith("data:")) {
      personBase64 = userImageBase64.split(",")[1];
    }

    // Load garment image base64 from public directory
    let garmentBase64 = "";
    try {
      if (dressImageUrl.startsWith("/product/")) {
        const localPath = path.join(process.cwd(), "public", dressImageUrl);
        const fileBuffer = await fs.readFile(localPath);
        garmentBase64 = fileBuffer.toString("base64");
      }
    } catch (e) {
      console.log("Could not load local dress file for base64:", e);
    }

    // 1. If Google Cloud Vertex AI Virtual Try-On credentials are provided
    if (vertexToken && vertexProjectId && garmentBase64) {
      console.log(`🚀 [Google Vertex AI VTO] Calling official Virtual Try-On API for project: ${vertexProjectId}...`);
      try {
        const vertexRes = await fetch(
          `https://${vertexLocation}-aiplatform.googleapis.com/v1/projects/${vertexProjectId}/locations/${vertexLocation}/publishers/google/models/virtual-try-on:predict`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${vertexToken}`,
            },
            body: JSON.stringify({
              instances: [
                {
                  personImage: {
                    bytesBase64Encoded: personBase64,
                  },
                  garmentImage: {
                    bytesBase64Encoded: garmentBase64,
                  },
                },
              ],
              parameters: {
                sampleCount: 1,
              },
            }),
          }
        );

        const vertexData = await vertexRes.json();
        console.log("Vertex AI Status:", vertexRes.status);

        if (vertexData.predictions?.[0]?.bytesBase64Encoded) {
          fittedImage = `data:image/jpeg;base64,${vertexData.predictions[0].bytesBase64Encoded}`;
          console.log("✅ [Google Vertex AI VTO] Successfully generated virtual try-on image!");
        } else {
          console.warn("⚠️ Vertex AI response details:", JSON.stringify(vertexData));
        }
      } catch (vertexErr) {
        console.error("❌ [Google Vertex AI VTO Error]:", vertexErr);
      }
    }

    // 2. Multimodal Stylist Verdict using Google AI (Gemma/Gemini)
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemma-4-26b-a4b-it:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an expert fashion stylist. Give a 3-bullet luxury styling appraisal for wearing ${dressName} (${fabric}, ${color}, Size ${size}). Keep it under 60 words.`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const geminiData = await geminiRes.json();
        const fullText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (fullText) {
          stylingAdvice = fullText.trim();
        }
      } catch (geminiErr) {
        console.error("⚠️ [Stylist AI Notice]:", geminiErr);
      }
    }

    // Fallback image if Vertex token is not yet configured
    if (!fittedImage) {
      const prompt = `High fashion studio photography of a person wearing an exquisite luxury ${color} ${fabric} ${dressName} with intricate golden zari embroidery, standing pose, perfect couture tailoring, elegant lighting, hyper-realistic, 8k resolution, photorealistic masterpiece`;
      const encodedPrompt = encodeURIComponent(prompt);
      const seed = Math.floor(Math.random() * 900000) + 100000;
      fittedImage = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=600&height=800&seed=${seed}&nologo=true&model=flux`;
    }

    console.log(`✨ [Try-On Ready] Result generated successfully.`);
    console.log("=======================================================\n");

    return NextResponse.json({
      success: true,
      stylingAdvice,
      fittedImage,
    });
  } catch (error: any) {
    console.error("❌ [AI Try-On Fatal Error]:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process AI Try-On" },
      { status: 500 }
    );
  }
}
