import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DashboardAll from "./DashBoardAll";

export default async function Admin() {
  // Fetch the session using Prisma in a server component
  const sessionId = cookies().get("session_id")?.value;
  console.log("=Serverside Page Rendering++++");

  console.log(sessionId);
  if (!sessionId) {
    // Redirect if there's no session ID in cookies
    console.log("No sessionId Found.");
    redirect("/admin_login");
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (!session || !session.isAuthenticated) {
    // Redirect if session is invalid or not authenticated
    console.log(
      "No matching serverside sessionID found or session not authenticated"
    );
    redirect("/admin_login");
  }

  return (
    <div>
      <h1 className="text-lx2">HISTORY</h1>
      <p>this is not NOT the dashboard. Please return to the dashbaord.</p>
      <DashboardAll></DashboardAll>
    </div>
  );
}
