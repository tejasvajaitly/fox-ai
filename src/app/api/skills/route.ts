import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

const parser = StructuredOutputParser.fromZodSchema(
  z
    .object({
      keywords: z
        .array(z.string())
        .describe(
          "List of important skills and keywords from the job description"
        ),
    })
    .describe("Skills and keywords extracted from the job description")
);

const getPrompt = async (jobDescription: string) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "You are an expert recruiter. Analyze the following job description and extract a list of important skills and keywords that a candidate should have in their resume to get shortlisted. Follow the instructions and format your response to match the format instructions, no matter what!\n\n{format_instructions}\n\nJob Description: {jobDescription}",
    inputVariables: ["jobDescription"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    jobDescription: jobDescription,
  });

  return input;
};

export async function POST(request: Request) {
  const body = await request.json();
  const { jobDescription } = body;
  if (!jobDescription) {
    return Response.json(
      { error: "No job description provided" },
      { status: 400 }
    );
  }

  try {
    const input = await getPrompt(jobDescription);
    console.log(input, "input");
    const model = new ChatOpenAI({
      temperature: 0,
      modelName: "gpt-3.5-turbo",
    });
    const output = await model.invoke(input);
    const data = await parser.invoke(output);

    console.log("data", data);
    return Response.json({ data });
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        error: "There was an error generating the response.",
      },
      { status: 400 }
    );
  }
}
