import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const budgetId = parseInt(params.id);
  const ownerId = parseInt(session.user.id);

  const budget = await prisma.budget.findFirst({ where: { id: budgetId, ownerId } });
  if (!budget) return NextResponse.json({ error: "Not found or not owner" }, { status: 404 });

  await prisma.budget.delete({ where: { id: budgetId } });
  return NextResponse.json({ message: "Budget deleted" });
}
