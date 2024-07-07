"use client";
import ExperienceForm from "@/app/form";
import ExperiencesList from "@/app/experiences";

function Experiences() {
  return (
    <div className="flex flex-col justify-center items-center">
      <ExperiencesList />
      <ExperienceForm />
    </div>
  );
}

export default Experiences;
