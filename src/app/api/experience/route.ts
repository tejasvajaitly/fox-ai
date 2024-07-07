import { db } from "@/db/index";
import { experiences } from "@/db/schema/experiences";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await db.insert(experiences).values({
      id: uuidv4(),
      companyName: body.companyName,
      role: body.role,
      metrics: body.metrics || null,
      project: body.project,
      userId: body.userId,
    });
    return Response.json({ data: "Experience saved successfully" });
  } catch (err) {
    console.log("Error", err);
    return Response.json(
      {
        error: "There was an error saving the experience.",
      },
      { status: 400 }
    );
  }
}
