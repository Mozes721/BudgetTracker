"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold text-white">
          BudgetTracker
        </Link>
        <div className="flex items-center gap-4">
          {session?.user?.name && (
            <span className="text-gray-400 text-sm">{session.user.name}</span>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
