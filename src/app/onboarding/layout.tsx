import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

function Layout({ children }: { children: React.ReactNode }) {
  console.log(auth().sessionClaims?.metadata.onboardingComplete, "lol");
  if (auth().sessionClaims?.metadata.onboardingComplete === true) {
    redirect("/dashboard");
  }
  return <div>{children}</div>;
}

export default Layout;
