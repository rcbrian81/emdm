import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import MenuRemove from "../components/MenuRemove";
import MenuAdd from "../components/MenuAdd";

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
      <div className="flex items-center justify-between p-6  rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-whtie">Manage Database</h1>
        <a
          href="/admin/dashboard"
          className="px-6 py-2 text-white bg-blue-700 hover:bg-blue-400 rounded-lg transition duration-200 shadow-md"
        >
          Kitchen Dashboard
        </a>
      </div>

      <MenuAdd></MenuAdd>
      <MenuRemove></MenuRemove>
    </div>
  );
}
