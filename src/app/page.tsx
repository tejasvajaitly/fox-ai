"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

export default function Home() {
  return (
    <main className=" min-h-screen">
      <Button onClick={() => toast.success("Hello World!")}>Click me</Button>
    </main>
  );
}
