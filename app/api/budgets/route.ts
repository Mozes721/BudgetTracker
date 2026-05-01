import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createBudgetSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = parseInt(session.user.id);
  const budgets = await prisma.budget.findMany({
    where: { OR: [{ ownerId: userId }, { shares: { some: { userId } } }] },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(budgets);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title } = createBudgetSchema.parse(body);
    const budget = await prisma.budget.create({
      data: { title, ownerId: parseInt(session.user.id) },
    });
    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
