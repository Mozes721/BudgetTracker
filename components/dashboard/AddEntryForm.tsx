"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

interface Props {
  budgetId: number;
  categories: Category[];
}

export default function AddEntryForm({ budgetId, categories }: Props) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [categoryId, setCategoryId] = useState(String(categories[0]?.id ?? ""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch(`/api/budgets/${budgetId}/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        value: parseFloat(value),
        isExpense,
        categoryId: parseInt(categoryId),
      }),
    });

    setLoading(false);
    if (!res.ok) {
      setError("Failed to add entry");
    } else {
      setTitle("");
      setValue("");
      router.refresh();
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>
      {error && <p className="mb-3 text-red-400 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-400 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="e.g. Grocery shopping"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Amount ($)</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex rounded-lg overflow-hidden border border-gray-700 flex-1">
            <button
              type="button"
              onClick={() => setIsExpense(true)}
              className={`flex-1 py-2 text-sm transition-colors ${isExpense ? "bg-red-600 text-white" : "bg-gray-800 text-gray-400"}`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setIsExpense(false)}
              className={`flex-1 py-2 text-sm transition-colors ${!isExpense ? "bg-green-600 text-white" : "bg-gray-800 text-gray-400"}`}
            >
              Income
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
