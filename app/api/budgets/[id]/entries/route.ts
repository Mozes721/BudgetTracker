import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createEntrySchema } from "@/lib/validations";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

async function getBudgetAccess(budgetId: number, userId: number) {
  return prisma.budget.findFirst({
    where: {
      id: budgetId,
      OR: [{ ownerId: userId }, { shares: { some: { userId } } }],
    },
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const budgetId = parseInt(params.id);
  const userId = parseInt(session.user.id);
  const budget = await getBudgetAccess(budgetId, userId);
  if (!budget) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const type = searchParams.get("type") ?? "all";
  const categoryId = searchParams.get("categoryId");

  const where: Prisma.BudgetEntryWhereInput = { budgetId };
  if (type === "income") where.isExpense = false;
  if (type === "expense") where.isExpense = true;
  if (categoryId) where.categoryId = parseInt(categoryId);

  const [entries, total] = await Promise.all([
    prisma.budgetEntry.findMany({
      where,
      include: { category: true },
      orderBy: { date: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.budgetEntry.count({ where }),
  ]);

  return NextResponse.json({ entries, total, page, limit });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const budgetId = parseInt(params.id);
  const userId = parseInt(session.user.id);
  const budget = await getBudgetAccess(budgetId, userId);
  if (!budget) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const body = await req.json();
    const { title, value, isExpense, categoryId, date } = createEntrySchema.parse(body);

    const entry = await prisma.budgetEntry.create({
      data: {
        budgetId,
        title,
        value,
        isExpense,
        categoryId,
        ...(date ? { date: new Date(date) } : {}),
      },
      include: { category: true },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
