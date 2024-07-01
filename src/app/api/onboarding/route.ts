import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const { userId } = auth();
  console.log("Inside post function");
  if (!userId) {
    return Response.json({ error: "No Logged In User" });
  }

  try {
    const res = await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });
    return Response.json({ data: "onboarding complete" });
  } catch (err) {
    return Response.json({
      error: "There was an error updating the user metadata.",
    });
  }
}
