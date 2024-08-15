import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`
export async function sendToLlama(systemPrompt, messagesLength, clientMessage, addMessageReference) {
  const chatCompletion = await getGroqChatCompletion(systemPrompt, clientMessage);
  console.log(chatCompletion.choices[0]?.message?.content || "");
  addMessageReference(messagesLength + 1, chatCompletion.choices[0]?.message?.content || "", true);
}

export async function getGroqChatCompletion(data) {
  console.log(data);
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: data
      },
    ],
    model: "llama3-8b-8192",
  });
}