"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  budgetId: number;
}

export default function ShareBudget({ budgetId }: Props) {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await fetch(`/api/budgets/${budgetId}/share`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    const data = await res.json();

    if (res.ok) {
      setMessage({ type: "success", text: data.message });
      setEmail("");
      router.refresh();
    } else {
      setMessage({ type: "error", text: data.error ?? "Failed to share" });
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
      >
        Share Budget
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {message && (
        <span
          className={`text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}
        >
          {message.text}
        </span>
      )}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="User email"
          className="px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
          autoFocus
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg"
        >
          {loading ? "Sharing..." : "Share"}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setMessage(null); }}
          className="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
