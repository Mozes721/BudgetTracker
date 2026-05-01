"use client";
import { useRouter, useSearchParams } from "next/navigation";

interface Budget {
  id: number;
  title: string;
  ownerId: number;
  owner: { fullname: string };
}

interface Props {
  budgets: Budget[];
  selectedId: number;
  currentUserId: number;
}

export default function BudgetSelector({ budgets, selectedId, currentUserId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("budgetId", e.target.value);
    params.delete("page");
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <select
      value={selectedId}
      onChange={handleChange}
      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
    >
      {budgets.map((b) => (
        <option key={b.id} value={b.id}>
          {b.title}
          {b.ownerId !== currentUserId ? ` (${b.owner.fullname})` : ""}
        </option>
      ))}
    </select>
  );
}
