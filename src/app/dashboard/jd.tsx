"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  jobDescription: z.string().min(10, {
    message: "job description must be at least 100 characters.",
  }),
});

type JDProps = {
  submitJD: (data: z.infer<typeof FormSchema>) => void;
};

const JD = forwardRef(function JDComponent(
  { submitJD }: JDProps,
  ref: React.Ref<HTMLFormElement>
) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    submitJD(data);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the Job Description here."
                    className="resize-none h-[400px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  try to copy paste only the relevant part of the job
                  description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </div>
  );
});

export default JD;
