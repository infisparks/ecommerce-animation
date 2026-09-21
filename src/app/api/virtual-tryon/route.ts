import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userImageBase64, dressImageUrl, dressName, fabric, color, size } = await req.json();

    console.log("\n=======================================================");
    console.log("✨ [AI TRY-ON API] Request Received");
    console.log(`👗 Dress: ${dressName} | Fabric: ${fabric} | Color: ${color} | Size: ${size}`);
    console.log("=======================================================");

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    let userDescription = "a woman";
    let stylingAdvice = `• Silhouette & Drape: The ${size} fit gracefully contours with royal flared drape.\n• Color Harmony: Rich ${color} brings out warm undertones with shimmering festive gold zari.\n• Styling Tip: Pair with pearl choker jewelry and traditional juttis for the complete royal look.`;

    // 1. Analyze User Photo with Gemini Vision if API key is present
    if (apiKey) {
      try {
        console.log("🔍 [Gemini Vision] Analyzing uploaded photo for facial & body features...");

        let base64Data = userImageBase64;
        let mimeType = "image/jpeg";
        if (userImageBase64.startsWith("data:")) {
          const parts = userImageBase64.split(",");
          const mimeMatch = parts[0].match(/:(.*?);/);
          if (mimeMatch) mimeType = mimeMatch[1];
          base64Data = parts[1];
        }

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Analyze this user's photo and do two things:
1. Describe the person's physical appearance (gender, approximate age range, hair color, hair length, smile, skin tone) in 1 short line, e.g. "a smiling young woman with long dark brown hair and radiant light skin".
2. Write a 3-bullet luxury haute couture styling verdict for them wearing ${dressName} (${fabric}, ${color}, Size ${size}).

Format your answer exactly as:
PERSON_DESC: <description>
VERDICT:
<3 bullet points>`,
                    },
                    {
                      inline_data: {
                        mime_type: mimeType,
                        data: base64Data,
                      },
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
          console.log("✅ [Gemini Vision] Successfully analyzed photo!");
          const descMatch = fullText.match(/PERSON_DESC:\s*(.*)/i);
          if (descMatch && descMatch[1]) {
            userDescription = descMatch[1].trim();
          }

          const verdictMatch = fullText.match(/VERDICT:\s*([\s\S]*)/i);
          if (verdictMatch && verdictMatch[1]) {
            stylingAdvice = verdictMatch[1].trim();
          } else {
            stylingAdvice = fullText;
          }
        }
      } catch (geminiErr) {
        console.error("⚠️ [Gemini Vision Warning]:", geminiErr);
      }
    }

    // 2. Generate Photorealistic AI Try-On Image
    console.log(`🎨 [AI Image Diffusion] Generating fitted look for: ${userDescription}`);
    const prompt = `High fashion studio photography of ${userDescription} wearing an exquisite luxury ${color} ${fabric} ${dressName} with intricate golden zari embroidery, standing pose, perfect couture tailoring, elegant lighting, hyper-realistic, 8k resolution, photorealistic masterpiece`;
    
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 900000) + 100000;
    const generatedImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=600&height=800&seed=${seed}&nologo=true&model=flux`;

    console.log(`🚀 [AI Image Generated]: ${generatedImageUrl}`);
    console.log("=======================================================\n");

    return NextResponse.json({
      success: true,
      stylingAdvice,
      fittedImage: generatedImageUrl,
    });
  } catch (error: any) {
    console.error("❌ [AI Try-On Fatal Error]:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process AI Try-On" },
      { status: 500 }
    );
  }
}
