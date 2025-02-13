import { NextResponse } from "next/server";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const apikeys = [
  process.env.GEMINI_API_KEY_1 || "",
  process.env.GEMINI_API_KEY_2 || "",
];

let currentKeyIndex = 0;

export async function POST(req: Request) {
  try {
    // Ensure API keys are available.
    if (!apikeys[0] || !apikeys[1]) {
      throw new Error("Both GEMINI API keys must be set in environment variables");
    }

    // Rotate API key.
    const apiKeyToUse = apikeys[currentKeyIndex];
    const genAI = new GoogleGenerativeAI(apiKeyToUse);
    currentKeyIndex = (currentKeyIndex + 1) % apikeys.length;

    // Read the incoming form data.
    const formData = await req.formData();
    const content = formData.get("content") as string | null;
    const type = formData.get("type") as string | null;
    const imageFile = formData.get("image") as File | null;
    const userDetailsJson = formData.get("userDetails") as string | null;

    // Validate required fields.
    if (!content || !type || !userDetailsJson) {
      throw new Error("Missing required fields: content, type, or userDetails");
    }

    // Parse the client-provided user details.
    const userProfile = JSON.parse(userDetailsJson);

    // Verify subscription status
    // const userDoc = await getDoc(doc(db, 'users', userProfile.uid));
    // const userData = userDoc.data();

    // if (!userData) {
    //   throw new Error("User data not found");
    // }

    // if (userData.subscriptionStatus === 'inactive') {
    //   return NextResponse.json({ error: "Subscription inactive" }, { status: 403 });
    // }

    // if (userData.subscriptionStatus === 'trial' && userData.postCount >= 3) {
    //   return NextResponse.json({ error: "Trial limit reached" }, { status: 403 });
    // }

    // Define the prompt styles.
    const prompts: Record<string, string> = {
      achievement:"Transform this achievement into an engaging LinkedIn post that's inspiring yet humble: ",
      experience:"Create a compelling LinkedIn post about this professional experience that offers value to others: ",
      professional:"Convert this message into a professional LinkedIn post that helps others grow: ",
      story:"Transform this story into an engaging LinkedIn post that captures attention and delivers value: ",
      fun:"Turn this fun fact into a light-hearted LinkedIn post that entertains and engages your audience: ",
    };

    const promptStyle = prompts[type] || prompts.achievement;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const parts: Part[] = [];

    // Build the text prompt using the user profile data.
    parts.push({
      text: `
      You are an expert LinkedIn post writer with years of experience crafting posts that are not only engaging but also go viral. Your mastery in understanding LinkedIn’s professional audience and leveraging the platform's dynamics has earned you numerous accolades in the realm of digital content creation.

Create an engaging and professional LinkedIn post that communicates the intended message effectively, tailored to the audience's preferences and the platform's professional ethos. Use the following structure to guide your writing:

Your posts should:

1. Engage and Hook Readers Immediately: Start with a bold statement or a thought-provoking question related to the topic or trend. Use this format: [emoji] [Hook] [emoji]
Example: 🌟 Is remote work the future of our industry? 🌟
2. Be Well-Structured: Use bullet points, numbered lists, or different bullet styles to break content into digestible parts:
Key Points: For highlighting major ideas ,
Benefits: To list advantages or positive outcomes,
Insights: For sharing data or perspectives.
3. Include Relevant Emojis: Add visual interest and emphasize points without using face emojis:
Use symbols like 📊 for data, 🌐 for global topics, etc.
4. End with a Strong Call to Action (CTA): Encourage engagement like comments, shares, or connections:
Example: "Let's discuss in the comments how this impacts our work. 📝👇"
5. Use Appropriate Hashtags: Enhance discoverability and relate to the post:
Example: #RemoteWork #FutureOfWork #Leadership
6. Maintain Conciseness: Keep the post between 100-300 words, with short paragraphs (1-3 lines) for mobile readability.

Be humble in your writing; speak from your own perspective, avoiding overly complex vocabulary to ensure clarity.

      Context about the writer:
      - writers Purpose: ${userProfile.linkedinPurpose}
      - writers Goals: ${userProfile.currentGoals}
      - writers industry: ${userProfile.industry}
      - Target Audience: ${userProfile.targetAudience}
      - opionios: ${userProfile.finalWords}
      - CTA: ${userProfile.cta}


Writing Style: ${promptStyle}
User's Prompt: ${content}
      `,
    });

    // If an image file is provided, convert it to base64 and add it as inline data.
    if (imageFile) {
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

    // Call the generative AI API with the prompt parts.
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
    });

    const generatedPost = result.response.text();

    if (!generatedPost) {
      throw new Error("No content generated from Gemini, server might be down");
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

