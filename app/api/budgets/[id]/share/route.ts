import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { shareBudgetSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const budgetId = parseInt(params.id);
  const ownerId = parseInt(session.user.id);

  const budget = await prisma.budget.findFirst({ where: { id: budgetId, ownerId } });
  if (!budget) return NextResponse.json({ error: "Budget not found or not yours" }, { status: 404 });

  try {
    const body = await req.json();
    const { email } = shareBudgetSchema.parse(body);

    const target = await prisma.user.findUnique({ where: { email } });
    if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (target.id === ownerId) return NextResponse.json({ error: "Cannot share with yourself" }, { status: 400 });

    await prisma.budgetShare.upsert({
      where: { budgetId_userId: { budgetId, userId: target.id } },
      create: { budgetId, userId: target.id },
      update: {},
    });

    return NextResponse.json({ message: `Budget shared with ${target.fullname}` });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
