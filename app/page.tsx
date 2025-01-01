import { redirect } from "next/navigation";

export default function LandingPage() {
  redirect("/login");

  return <main className="flex justify-center items-center h-screen"></main>;
}
