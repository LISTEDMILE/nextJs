import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

export async function POST() {
    try {
      









    // temp response due to no openai tokens...
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            "🤖 I'd generate a brilliant question here, but my creator's wallet said '404 Funds Not Found' 💸||🚀 If unlimited AI tokens suddenly appeared in your account, what's the first thing you'd build? 😆||🍜 What's cheaper than OpenAI tokens and still brings you happiness on a bad day?",
          ),
        );
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
    ////  aise hi h uper wala kyoki tokens nhi h abhi....

        
        
        


        
        
        
        
    const prompt = `
Create a list of three open-ended and engaging questions formatted as a single string.

Each question should be separated by '||'.

These questions are for an anonymous social messaging platform and should be suitable for a diverse audience.

Avoid personal or sensitive topics and focus on universal themes that encourage friendly interaction.

Example output:

What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?
`;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      prompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating suggestions:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to generate suggestions",
      },
      {
        status: 500,
      },
    );
  }
}
