"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
  <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
    
    {/* Logo */}
    <Link
      href="/"
      className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent"
    >
      Mystery Message
    </Link>

    {/* Right Section */}
    <div className="flex items-center gap-4">
      {session ? (
        <>
          <div className="hidden sm:flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="font-medium">
              {user?.username || user?.email || "User"}
            </span>
          </div>

          <Button
            variant="destructive"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </>
      ) : (
        <Link href="/sign-in">
          <Button>
            Login
          </Button>
        </Link>
      )}
    </div>
  </div>
</nav>
  );
}
