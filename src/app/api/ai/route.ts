import { OpenAI } from "@langchain/openai";

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;
  if (!prompt) {
    return Response.json({ error: "No prompt provided" });
  }

  try {
    const model = new OpenAI({ temperature: 0, model: "gpt-3.5-turbo" });
    const response = await model.invoke(prompt);
    return Response.json({ data: response });
  } catch (err) {
    return Response.json({
      error: "There was an error generating the response.",
    });
  }
}
