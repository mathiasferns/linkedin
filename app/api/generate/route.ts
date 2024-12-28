import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: "https://api.x.ai/v1",
})

export async function POST(req: Request) {
  try {
    if (!process.env.GROK_API_KEY) {
      throw new Error("GROK_API_KEY is not set in environment variables")
    }

    const { content, type } = await req.json()

    if (!content || !type) {
      throw new Error("Missing required fields: content and type")
    }

    const prompts = {
      achievement: "Transform this achievement into an engaging LinkedIn post that's inspiring yet humble: ",
      experience: "Create a compelling LinkedIn post about this professional experience that offers value to others: ",
      advice: "Convert this advice into an insightful LinkedIn post that helps others grow professionally: ",
      story: "Transform this story into an engaging LinkedIn post that captures attention and delivers value: "
    }

    const prompt = prompts[type as keyof typeof prompts] || prompts.achievement

    const completion = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        {
          role: "system",
          content: `You are an expert LinkedIn post writer. Your posts are:
          1. **Engaging and hook readers in the first line** with a provocative question or a bold statement related to the trend or topic.
          2. **Well-structured with short paragraphs** to ensure readability, especially on mobile devices.
          3. **Include relevant emojis** to add visual interest and convey emotions or key points effectively.
          4. **End with a call to action** that encourages engagement.
          5. **Use appropriate hashtags** and connect with the relevant audience.
          6. **Between 200-300 words** for optimal engagement, ensuring the message is concise yet informative.`
        },
        {
          role: "user",
          content: prompt + content
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    const generatedPost = completion.choices[0].message.content

    if (!generatedPost) {
      throw new Error("No content generated from Grok API")
    }

    return NextResponse.json({ post: generatedPost })
  } catch (error) {
    console.error("Error in generate route:", error)
    return NextResponse.json({ error: `Error: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 })
  }
}

