import { db } from "@/db/index";
import { auth } from "@clerk/nextjs/server";
import { experiences } from "@/db/schema/experiences";
import { z } from "zod";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) return new Response("Unauthenticated", { status: 401 });

    const selectedExperiences = await db.query.experiences.findMany({
      where: eq(experiences.userId, userId),
    });
    return Response.json({ data: selectedExperiences });
  } catch (error) {
    return Response.json(
      { error: "Something wrong with our server, try again later" },
      { status: 400 }
    );
  }
}
