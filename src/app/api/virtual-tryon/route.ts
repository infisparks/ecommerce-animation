import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userImageBase64, dressImageUrl, dressName, fabric, color, size } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Prepare user image data
    let base64Data = userImageBase64;
    let mimeType = "image/jpeg";
    if (userImageBase64.startsWith("data:")) {
      const parts = userImageBase64.split(",");
      const mimeMatch = parts[0].match(/:(.*?);/);
      if (mimeMatch) mimeType = mimeMatch[1];
      base64Data = parts[1];
    }

    // Call Google Gemini Vision Multimodal Model
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert haute couture fashion stylist & AI virtual fitting advisor. Analyze this person's photo for trying on the royal dress: "${dressName}" (Fabric: ${fabric}, Color: ${color}, Size: ${size}).
Provide a concise, encouraging, and luxurious fitting verdict with 3 bullet points:
1. Silhouette & Fit Assessment (how the ${size} drape flatters their frame)
2. Color & Tone Harmony (how ${color} complements their complexion and lighting)
3. Styling & Occasion Recommendation (jewelry/footwear tips). Keep it inspiring and premium under 80 words.`,
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
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 250,
          },
        }),
      }
    );

    const geminiData = await geminiRes.json();
    const stylingAdvice =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      `The royal ${dressName} in ${color} drapes elegantly, offering a tailored fit and radiant contrast.`;

    return NextResponse.json({
      success: true,
      stylingAdvice,
      fittedImage: dressImageUrl,
    });
  } catch (error: any) {
    console.error("Virtual Try-On Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process AI Try-On" },
      { status: 500 }
    );
  }
}
