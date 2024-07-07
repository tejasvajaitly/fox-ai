"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToBeExperience } from "@/types";

const FormSchema = z.object({
  companyName: z.string().min(2, {
    message: "companyName name must be at least 4 characters.",
  }),

  role: z.string().min(2, {
    message: "Role must be at least 5 characters.",
  }),

  context: z.string().min(2, {
    message: "Industry must be at least 5 characters.",
  }),

  project: z.string(),

  metrics: z.string(),
});

const flds: {
  name: "companyName" | "role" | "context" | "project" | "metrics";
  label: string;
  placeholder: string;
  formDescpt: string;
}[] = [
  {
    name: "companyName",
    label: "companyName One",
    placeholder: "Amazon Inc.",
    formDescpt: "",
  },
  {
    name: "role",
    label: "Title",
    placeholder: "Software Engineer II",
    formDescpt: "",
  },
  {
    name: "context",
    label: "Industry",
    placeholder: "ed-tech, fin-tech, climate-tech, etc.",
    formDescpt: "",
  },
  {
    name: "project",
    label: "project",
    placeholder: "ecommerce clothing app, digital savings account, etc.",
    formDescpt: "",
  },
  {
    name: "metrics",
    label: "Metrics",
    placeholder: "10% decrease in API response time...",
    formDescpt: "",
  },
];

export default function ExperienceForm() {
  const router = useRouter();
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  async function saveExperience(experience: ToBeExperience) {
    const res = await fetch(`/api/experience`, {
      method: "POST",
      body: JSON.stringify(experience),
    });
    if (!res.ok) throw new Error("Failed to save experience");

    return await res.json();
  }

  const mutation = useMutation({
    mutationFn: saveExperience,
    onError: (error, variables, context) => {
      console.log("save data failed and the error from mutation", error);
      toast.error("Opps, an error occurred!");
    },
    onSuccess: (data, variables, context) => {
      console.log("save data from mutation", data);
      // form.reset();
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Added successfully!");
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: "",
      role: "",
      context: "",
      project: "",
      metrics: "",
    },
  });

  if (!userId) {
    router.push("/dashboard");
    return null;
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate({ ...data, userId: userId! });
  }

  return (
    <div className="h-full w-full md:w-[500px]">
      <ScrollArea className="rounded-md border border-none md:h-[90%] ">
        <div className="flex flex-row items-center justify-start gap-2">
          <h2 className="py-8 pl-4 text-2xl font-semibold leading-none tracking-tight">
            Add Experience
          </h2>
          <HoverCard>
            <HoverCardTrigger className="cursor-pointer">
              <CircleHelp size={16} />
            </HoverCardTrigger>
            <HoverCardContent>
              Share all your work from your resume. You only need to do this
              once.
              <br /> Next time, just paste the job description you&#39;re
              targeting, and we&#39;ll use your info to create bullet points for
              each job, ready to copy and paste into your favorite resume
              editing tool.
            </HoverCardContent>
          </HoverCard>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-4 py-4"
          >
            {flds.map((fldOne) => (
              <FormField
                key={fldOne.label}
                control={form.control}
                name={fldOne.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fldOne.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={fldOne.placeholder}
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription>{fldOne.formDescpt}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" disabled={mutation.isPending ? true : false}>
              {mutation.isPending ? <Spinner /> : "Save"}
            </Button>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="0.75s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
