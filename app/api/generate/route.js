import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const systemPrompt = `
You are a flashcard creator. Create exactly 10 flashcards from the input text. Both front and back should be one sentence long.
Return ONLY the following JSON format, with no additional text before or after:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY, dangerouslyAllowBrowser: true })
  const data = await req.text()

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: data
        },
      ],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" },
      temperature: 0.2, // Lower temperature for more consistent output
    });

    const content = completion.choices[0].message.content;


    try {
      const flashcards = JSON.parse(content);
      //console.log("Generated flashcards:", flashcards);
      return NextResponse.json(flashcards);
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      return NextResponse.json({ error: "Failed to generate valid JSON" }, { status: 500 });
    }
  } catch (apiError) {
    console.error("API Error:", apiError);
    return NextResponse.json({ error: "Error calling Groq API" }, { status: 500 });
  }
}