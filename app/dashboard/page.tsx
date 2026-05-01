import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import BudgetSelector from "@/components/dashboard/BudgetSelector";
import BalanceCard from "@/components/dashboard/BalanceCard";
import AddEntryForm from "@/components/dashboard/AddEntryForm";
import OverviewTable from "@/components/dashboard/OverviewTable";
import CreateBudgetForm from "@/components/dashboard/CreateBudgetForm";
import ShareBudget from "@/components/dashboard/ShareBudget";

interface Props {
  searchParams: {
    budgetId?: string;
    page?: string;
    type?: string;
    categoryId?: string;
  };
}

export default async function DashboardPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userId = parseInt(session.user.id);
  const page = Math.max(1, parseInt(searchParams.page ?? "1"));
  const limit = 10;
  const type = searchParams.type ?? "all";
  const categoryId = searchParams.categoryId ? parseInt(searchParams.categoryId) : undefined;

  const [budgets, categories] = await Promise.all([
    prisma.budget.findMany({
      where: {
        OR: [{ ownerId: userId }, { shares: { some: { userId } } }],
      },
      include: { owner: { select: { fullname: true } } },
      orderBy: { createdAt: "asc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (budgets.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-4xl mx-auto p-6 text-center py-16">
          <h2 className="text-xl font-semibold mb-2">No budgets yet</h2>
          <p className="text-gray-400 mb-6">Create your first budget to get started.</p>
          <CreateBudgetForm />
        </main>
      </div>
    );
  }

  const selectedBudgetId = searchParams.budgetId
    ? parseInt(searchParams.budgetId)
    : budgets[0].id;

  const isOwner = budgets.find((b: { id: number; ownerId: number }) => b.id === selectedBudgetId)?.ownerId === userId;

  const entryFilter = {
    budgetId: selectedBudgetId,
    ...(type === "income" ? { isExpense: false } : {}),
    ...(type === "expense" ? { isExpense: true } : {}),
    ...(categoryId ? { categoryId } : {}),
  };

  const [entries, totalEntries, incomeAgg, expenseAgg] = await Promise.all([
    prisma.budgetEntry.findMany({
      where: entryFilter,
      include: { category: true },
      orderBy: { date: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.budgetEntry.count({ where: entryFilter }),
    prisma.budgetEntry.aggregate({
      where: { budgetId: selectedBudgetId, isExpense: false },
      _sum: { value: true },
    }),
    prisma.budgetEntry.aggregate({
      where: { budgetId: selectedBudgetId, isExpense: true },
      _sum: { value: true },
    }),
  ]);

  const totalIncome = incomeAgg._sum.value ?? 0;
  const totalExpenses = expenseAgg._sum.value ?? 0;
  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <BudgetSelector budgets={budgets} selectedId={selectedBudgetId} currentUserId={userId} />
          {isOwner && <ShareBudget budgetId={selectedBudgetId} />}
          <div className="ml-auto">
            <CreateBudgetForm />
          </div>
        </div>
        <BalanceCard balance={balance} income={totalIncome} expenses={totalExpenses} />
        <AddEntryForm budgetId={selectedBudgetId} categories={categories} />
        <OverviewTable
          entries={entries}
          categories={categories}
          total={totalEntries}
          page={page}
          limit={limit}
          type={type}
          categoryId={categoryId?.toString() ?? ""}
          budgetId={selectedBudgetId}
        />
      </main>
    </div>
  );
}
