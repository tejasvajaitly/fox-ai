"use client";

import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Page() {
  const { user } = useUser();
  const router = useRouter();

  const completeOnboarding = async () => {
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
      });
      const json = await res.json();
      if (json.data) {
        await user?.reload();
        router.replace("/dashboard");
      } else {
        throw new Error("lol fool");
      }
    } catch (err) {
      console.log(err);
      toast.error("Onboarding complete failed!");
    }
  };

  return (
    <div>
      <h1>Onboarding</h1>
      <p>Welcome to the onboarding page!</p>
      <button onClick={completeOnboarding}>complete onboarding me</button>
    </div>
  );
}

export default Page;
