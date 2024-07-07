"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Intro from "./intro";
import Experiences from "./experiences";
import Congratulations from "./congratulations";

function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [progress, setProgress] = useState(0);

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

  const toExp = () => setProgress(99);
  const toCongrats = () => setProgress(100);
  const finish = () => completeOnboarding();

  const NextBtn = () => {
    if (progress === 0) return <Button onClick={toExp}>Next</Button>;
    if (progress === 99) return <Button onClick={toCongrats}>Next</Button>;
    if (progress === 100) return <Button onClick={finish}>Finish</Button>;
  };

  const Step = () => {
    if (progress === 0) return <Intro />;
    if (progress === 99) return <Experiences />;
    if (progress === 100) return <Congratulations />;
  };

  return (
    <div>
      <h1>Onboarding</h1>
      <Progress value={progress} />

      <div className="flex flex-row justify-end items-center my-8">
        <NextBtn />
      </div>
      <Step />
    </div>
  );
}

export default Page;
