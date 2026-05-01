"use client";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

interface Entry {
  id: number;
  title: string;
  value: number;
  isExpense: boolean;
  date: string | Date;
  category: Category;
}

interface Props {
  entries: Entry[];
  categories: Category[];
  total: number;
  page: number;
  limit: number;
  type: string;
  categoryId: string;
  budgetId: number;
}

export default function OverviewTable({
  entries,
  categories,
  total,
  page,
  limit,
  type,
  categoryId,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / limit);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") params.delete("page");
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-700">
          {(["all", "income", "expense"] as const).map((t) => (
            <button
              key={t}
              onClick={() => updateParam("type", t === "all" ? "" : t)}
              className={`px-3 py-1 text-sm capitalize transition-colors ${
                type === t || (t === "all" && !type)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <select
          value={categoryId}
          onChange={(e) => updateParam("categoryId", e.target.value)}
          className="px-3 py-1 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-400 ml-auto">
          {total} transaction{total !== 1 ? "s" : ""}
        </span>
      </div>

      {entries.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No transactions found.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
              <th className="pb-3 font-medium">Title</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium text-right">Amount</th>
              <th className="pb-3 font-medium text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="py-3 pr-4">{entry.title}</td>
                <td className="py-3 pr-4 text-sm text-gray-400">{entry.category.name}</td>
                <td className="py-3 pr-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      entry.isExpense
                        ? "bg-red-900/40 text-red-400"
                        : "bg-green-900/40 text-green-400"
                    }`}
                  >
                    {entry.isExpense ? "Expense" : "Income"}
                  </span>
                </td>
                <td
                  className={`py-3 text-right font-medium ${
                    entry.isExpense ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {entry.isExpense ? "-" : "+"}${entry.value.toFixed(2)}
                </td>
                <td className="py-3 text-right text-sm text-gray-400">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
          <button
            onClick={() => updateParam("page", String(page - 1))}
            disabled={page <= 1}
            className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg"
          >
            Previous
          </button>
          <span className="text-sm text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => updateParam("page", String(page + 1))}
            disabled={page >= totalPages}
            className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
