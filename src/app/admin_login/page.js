"use client";
// src/app/login/page.js

import { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";

export default function Admin_Login() {
  console.log("=Serverside Page Rendering++++");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuthentication() {
      const res = await fetch("/api/session/check");
      console.log("Response Status:", res.status);
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (data.isAuthenticated) {
        router.push("/admin");
      }
    }

    checkAuthentication();
  }, []);

  // Fetch the session using Prisma in a server component

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Send login request to the server
    const res = await fetch("/api/login_admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    console.log("Response Recived");
    if (res.ok) {
      console.log("Response OK");
      // Redirect to admin page if login is successful
      router.push("/admin");
    } else {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded text-black"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
}
