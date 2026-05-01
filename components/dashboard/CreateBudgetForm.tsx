"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBudgetForm() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setLoading(false);
    if (res.ok) {
      const budget = await res.json();
      setTitle("");
      setOpen(false);
      router.push(`/dashboard?budgetId=${budget.id}`);
      router.refresh();
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
      >
        + New Budget
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Budget name"
        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        autoFocus
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg text-sm"
      >
        Create
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"
      >
        Cancel
      </button>
    </form>
  );
}
