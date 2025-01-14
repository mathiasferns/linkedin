import { NextResponse } from "next/server";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const apikeys = [
  process.env.GEMINI_API_KEY_1 || "",
  process.env.GEMINI_API_KEY_2 || "",
];

let currentKeyIndex = 0;

export async function POST(req: Request) {
  try {
    if (!apikeys[0] || !apikeys[1]) {
      throw new Error("Both KEY_1 and KEY_2 must be set in environment variables");
  }

  const apiKeyToUse = apikeys[currentKeyIndex];
    const genAI = new GoogleGenerativeAI(apiKeyToUse);

    // Alternate the key index for the next request
    currentKeyIndex = (currentKeyIndex + 1) % apikeys.length;


    const formData = await req.formData();
    const content = formData.get("content") as string | null;
    const type = formData.get("type") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (!content || !type) {
        throw new Error("Missing required fields: content and type")
    }
    
    const prompts = {
        achievement: "Transform this achievement into an engaging LinkedIn post that's inspiring yet humble: ",
        experience: "Create a compelling LinkedIn post about this professional experience that offers value to others: ",
        professional: "Convert this message into a professional LinkedIn post that helps others grow: ",
        story: "Transform this story into an engaging LinkedIn post that captures attention and delivers value: ",
        fun: "Turn this fun fact into a light-hearted LinkedIn post that entertains and engages your audience: "
    };

    const prompt = prompts[type as keyof typeof prompts] || prompts.achievement;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const parts: Part[] = [];

    // Add text prompt to the parts array
    parts.push({
      text: `
        You are an expert LinkedIn post writer. Your posts are:
            1. **Engaging and hook readers in the first line** with a bold statement or a provocative question related to the trend or topic.(format:[emoji] [question or statement][emoji])
            2. **Well-structured with SHORT paragraphs** (1 - 3 lines) to ensure readability, especially on mobile devices.
            3. **Include relevant emojis** to add visual interest and convey emotions or key points effectively.
            4. **End with a call to action** that encourages engagement.
            5. **Use appropriate hashtags** and connect with the relevant audience.
            6. **Between 100-300 words** for optimal engagement, ensuring the message is concise yet informative.
            Be humble and write prompts from the writers point of view, be relatable and try not use too fancy words.
            // dont use face emojis //

          ${prompt}${content}`,
    });

    if (imageFile) {
        // Convert image file to base64
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString("base64");
      parts.push({
            inlineData: {
            mimeType: imageFile.type,
            data: base64Image,
          },
        });
    }
      
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
  });

    const generatedPost = result.response.text();

    if (!generatedPost) {
      throw new Error("No content generated from Gemini API");
    }

    return NextResponse.json({ post: generatedPost });
  } catch (error) {
    console.error("Error in generate route:", error);
    return NextResponse.json(
      {
        error: `Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}

