"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "@/components/ui/progress";
import JD from "./jd";
import Skills from "./skills";
import Points from "./points";

function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [skills, setSkills] = useState([] as string[]);
  const formRef = useRef<HTMLFormElement>(null);

  const submitJD = async (data: { jobDescription: string }) => {
    try {
      setLoading(true);
      const res = await fetch("/api/skills", {
        method: "POST",
        body: JSON.stringify({
          jobDescription: data.jobDescription,
        }),
      });
      const json = await res.json();
      console.log(json.data.keywords);
      setSkills(json.data.keywords);
      toSkills();
    } catch (err) {
      console.log(err);
      toast.error("oops, something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const toSkills = () => setProgress(99);
  const toPoints = () => setProgress(100);
  const finish = () => setProgress(0);

  const NextBtn = () => {
    if (progress === 0)
      return (
        <Button
          disabled={loading}
          onClick={() => formRef.current?.requestSubmit()}
        >
          {loading ? <Spinner /> : "Next"}
        </Button>
      );
    if (progress === 99)
      return (
        <Button disabled={loading} onClick={toPoints}>
          {loading ? <Spinner /> : "Next"}
        </Button>
      );
    if (progress === 100)
      return (
        <Button disabled={loading} onClick={finish}>
          {loading ? <Spinner /> : "Start Over"}
        </Button>
      );
  };

  const Step = () => {
    if (progress === 0) return <JD submitJD={submitJD} ref={formRef} />;
    if (progress === 99) return <Skills skills={skills} />;
    if (progress === 100) return <Points />;
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
