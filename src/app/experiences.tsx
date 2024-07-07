import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { CircleHelp } from "lucide-react";
import { Experience } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

export default function ExperiencesList() {
  async function getExperiences() {
    const res = await fetch(`/api/experiences`);
    if (!res.ok) throw new Error("Failed to get experiences");
    return await res.json();
  }

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
  });
  return (
    <div className="h-full w-full">
      <div className="flex flex-row items-center justify-start gap-2">
        <h2 className="py-8 pl-4 text-2xl font-semibold leading-none tracking-tight">
          Experiences
        </h2>
        <HoverCard>
          <HoverCardTrigger className="cursor-pointer">
            <CircleHelp size={16} />
          </HoverCardTrigger>
          <HoverCardContent>
            We&#39;ll use use your title, industry, project & metrics combine it
            with the job description to create a beautiful bullet point that you
            can paste in your favourite resume editor.
          </HoverCardContent>
        </HoverCard>
      </div>
      {isPending ? (
        <div className="flex flex-col items-center justify-start gap-4 px-4 py-4 md:px-12">
          <Skeleton className="h-[130px] w-full rounded-xl" />
          <Skeleton className="h-[130px] w-full rounded-xl" />
          <Skeleton className="h-[130px] w-full rounded-xl" />
        </div>
      ) : isError ? (
        <div>{error?.message}</div>
      ) : data?.data?.length ? (
        <ScrollArea className="h-[300px] rounded-md border border-none md:h-[80%]">
          <div className="flex flex-col items-center justify-start gap-4 px-4 py-4 md:px-12">
            {data.data.map((experience: Experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div>No experiences found.</div>
      )}
    </div>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{experience.role}</CardTitle>
        <p>{experience.companyName}</p>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{experience.project}</div>
        <p className="text-muted-foreground text-xs">{experience.metrics}</p>
      </CardContent>
    </Card>
  );
}
