// import { redirect } from "next/navigation";
// import { auth } from "@clerk/nextjs/server";

function Layout({ children }: { children: React.ReactNode }) {
  // console.log(auth().sessionClaims?.metadata.onboardingComplete, "lol");
  // if (auth().sessionClaims?.metadata.onboardingComplete === true) {
  //   redirect("/dashboard");
  // }
  return (
    <div className="w-full flex flex-row justify-center ">
      <div className="w-full md:w-4/6 p-8">{children}</div>
    </div>
  );
}

export default Layout;
