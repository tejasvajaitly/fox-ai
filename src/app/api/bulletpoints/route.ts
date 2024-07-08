import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { eq } from "drizzle-orm";
import { experiences } from "@/db/schema/experiences";
import { db } from "@/db/index";

const parser = StructuredOutputParser.fromZodSchema(
  z
    .array(
      z.object({
        id: z
          .string()
          .describe(
            "the exact same id of the experience object that you used, do not change this field"
          ),
        userId: z
          .string()
          .describe("Identifier of the user this experience belongs to"),
        companyName: z
          .string()
          .describe("Name of the company where the experience took place"),
        role: z
          .string()
          .describe("Job title or role held during this experience"),
        metrics: z
          .string()
          .nullable()
          .describe("Quantifiable achievements or metrics, if available"),
        project: z
          .string()
          .describe("Description of the main project or responsibilities"),
        bulletPoint: z
          .string()
          .describe(
            "Generated bullet point highlighting key aspects of this experience for the target job"
          ),
      })
    )
    .describe(
      "Array of past experiences, each with a generated bullet point tailored to the target job"
    )
);

const getPrompt = async (
  pastExperiences: {
    id: string;
    userId: string;
    companyName: string;
    role: string;
    metrics: string | null;
    project: string;
    createdAt: Date;
    updatedAt: Date;
  }[],
  jobDescription: string
) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\nPast Experiences: {pastExperiences}\n\nJob Description: {jobDescription}",
    inputVariables: ["pastExperiences", "jobDescription"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    pastExperiences: JSON.stringify(pastExperiences),
    jobDescription: jobDescription,
  });

  return input;
};

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthenticated", { status: 401 });
  const body = await request.json();
  const { jobDescription } = body;
  if (!jobDescription) {
    return Response.json({ error: "No prompt provided" });
  }

  const pastExperiences = await db.query.experiences.findMany({
    where: eq(experiences.userId, userId),
  });
  try {
    const input = await getPrompt(pastExperiences, jobDescription);
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
