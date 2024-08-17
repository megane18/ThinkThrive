// import { NextResponse } from 'next/server'
// import Groq from 'groq-sdk'

// const systemPrompt = `
// You are a helpful customer support assistant for our flashcard generation website. Our site features:
// 1. A navbar hamburger menu for navigation.
// 2. User authentication (sign in/sign up).
// 3. Different plans: Free, Pro, and Enterprise.
// 4. Option to save flashcard sets.
// 5. Ability to view saved flashcard sets upon login.
// 6. Feature to exit saved sets and return to generating new flashcards.

// Follow these guidelines:
// 1. Greet the user warmly and offer assistance.
// 2. If the user has provided their name in a previous message, use it in your greeting.
// 3. Keep responses concise and natural, as if in a real conversation.
// 4. Provide accurate information about our features and plans when asked.
// 5. Guide users on how to navigate the site, use the flashcard generator, and manage their saved sets.
// 6. If users encounter issues, offer troubleshooting steps or direct them to appropriate resources.
// 7. Always maintain a professional and friendly tone.
// 8. Do not invent features or information not mentioned above.
// `

// export async function POST(req) {
//   try {
//     const groq = new Groq({ apiKey: process.env.GROQ_API_KEY, dangerouslyAllowBrowser: true })
//     const data = await req.json()
//     console.log("Received data:", data);

//     const completion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: systemPrompt
//         },
//         ...data.messages
//       ],
//       model: "mixtral-8x7b-32768",
//       temperature: 0.7,
//     });

//     console.log("Groq API response:", completion);

//     if (completion.choices && completion.choices[0] && completion.choices[0].message) {
//       const assistantReply = completion.choices[0].message.content;
//       return NextResponse.json({ reply: assistantReply });
//     } else {
//       throw new Error("Unexpected response structure from Groq API");
//     }
//   } catch (apiError) {
//     console.error("Detailed API Error:", apiError);
//     return NextResponse.json({ error: apiError.message || "Error calling Groq API" }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const systemPrompt = `
You are a helpful customer support assistant for our flashcard generation website. Our site features:
1. A navbar hamburger menu for navigation.
2. User authentication (sign in/sign up).
3. Different plans: Free, Pro, and Enterprise.
4. Option to save flashcard sets.
5. Ability to view saved flashcard sets upon login.
6. Feature to exit saved sets and return to generating new flashcards.
7. A feedback system where users can leave comments and a 5-star rating.

Follow these guidelines:
1. Greet the user warmly and offer assistance.
2. If the user has provided their name in a previous message, use it in your greeting.
3. Keep responses concise and natural, as if in a real conversation.
4. Provide accurate information about our features and plans when asked.
5. Guide users on how to navigate the site, use the flashcard generator, and manage their saved sets.
6. If users encounter issues, offer troubleshooting steps or direct them to appropriate resources.
7. When a user wants to leave feedback, guide them through the process:
   a. Ask them to provide their feedback or comments.
   b. After they provide feedback, ask them to rate their experience from 1 to 5 stars.
   c. Thank them for their feedback and inform them it will be displayed on the main page.
8. Always maintain a professional and friendly tone.
9. Do not invent features or information not mentioned above.
`

let currentState = 'normal'
let userFeedback = ''

export async function POST(req) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY, dangerouslyAllowBrowser: true })
    const data = await req.json()
    console.log("Received data:", data);

    let assistantReply = ''

    if (currentState === 'awaitingFeedback') {
      userFeedback = data.messages[data.messages.length - 1].content
      currentState = 'awaitingRating'
      assistantReply = "Thank you for your feedback! On a scale of 1 to 5 stars, how would you rate your experience?"
    } else if (currentState === 'awaitingRating') {
      const rating = parseInt(data.messages[data.messages.length - 1].content)
      if (rating >= 1 && rating <= 5) {
        // Here you would typically save the feedback and rating to your database
        console.log(`Feedback: ${userFeedback}, Rating: ${rating}`)
        currentState = 'normal'
        assistantReply = `Thank you for your ${rating}-star rating! Your feedback has been saved and will be displayed on our main page. Is there anything else I can help you with?`
      } else {
        assistantReply = "I'm sorry, but the rating should be between 1 and 5. Could you please provide a rating from 1 to 5 stars?"
      }
    } else {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          ...data.messages
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
      });

      console.log("Groq API response:", completion);

      if (completion.choices && completion.choices[0] && completion.choices[0].message) {
        assistantReply = completion.choices[0].message.content;
        if (assistantReply.toLowerCase().includes("provide your feedback")) {
          currentState = 'awaitingFeedback'
        }
      } else {
        throw new Error("Unexpected response structure from Groq API");
      }
    }

    return NextResponse.json({ reply: assistantReply });
  } catch (apiError) {
    console.error("Detailed API Error:", apiError);
    return NextResponse.json({ error: apiError.message || "Error calling Groq API" }, { status: 500 });
  }
}