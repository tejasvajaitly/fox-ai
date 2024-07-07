"use client";
import { useAuth } from "@clerk/nextjs";

function Experiences() {
  const { userId } = useAuth();
  const saveExperience = async () => {
    try {
      const response = await fetch("/api/experience", {
        method: "POST",
        body: JSON.stringify({
          companyName: "Google",
          role: "Software Engineer",
          project: "Worked on the search engine",
          metrics: "Increased search speed by 10%",
          userId: userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Experience</h1>
      <p>Experience</p>
      <button onClick={saveExperience}>save</button>
    </div>
  );
}

export default Experiences;
