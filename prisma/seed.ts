import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.budgetEntry.deleteMany();
  await prisma.budgetShare.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  const [food, transport, salary, entertainment, utilities] = await Promise.all([
    prisma.category.create({ data: { name: "Food & Groceries" } }),
    prisma.category.create({ data: { name: "Transport" } }),
    prisma.category.create({ data: { name: "Salary" } }),
    prisma.category.create({ data: { name: "Entertainment" } }),
    prisma.category.create({ data: { name: "Utilities" } }),
  ]);

  const hash = await bcrypt.hash("password123", 10);

  const [alice, bob] = await Promise.all([
    prisma.user.create({ data: { fullname: "Alice Smith", email: "alice@example.com", password: hash } }),
    prisma.user.create({ data: { fullname: "Bob Johnson", email: "bob@example.com", password: hash } }),
    prisma.user.create({ data: { fullname: "Carol Williams", email: "carol@example.com", password: hash } }),
  ]);

  const [aliceBudget, familyBudget, bobBudget] = await Promise.all([
    prisma.budget.create({ data: { title: "Personal Budget", ownerId: alice.id } }),
    prisma.budget.create({ data: { title: "Family Budget", ownerId: alice.id } }),
    prisma.budget.create({ data: { title: "Personal Budget", ownerId: bob.id } }),
  ]);

  await prisma.budgetShare.create({ data: { budgetId: familyBudget.id, userId: bob.id } });

  await prisma.budgetEntry.createMany({
    data: [
      { budgetId: aliceBudget.id, title: "Monthly Salary", value: 4500, isExpense: false, categoryId: salary.id },
      { budgetId: aliceBudget.id, title: "Grocery Run", value: 120.50, isExpense: true, categoryId: food.id },
      { budgetId: aliceBudget.id, title: "Netflix", value: 15, isExpense: true, categoryId: entertainment.id },
      { budgetId: aliceBudget.id, title: "Electric Bill", value: 85, isExpense: true, categoryId: utilities.id },
      { budgetId: aliceBudget.id, title: "Bus Pass", value: 45, isExpense: true, categoryId: transport.id },
      { budgetId: familyBudget.id, title: "Combined Salaries", value: 7500, isExpense: false, categoryId: salary.id },
      { budgetId: familyBudget.id, title: "Mortgage", value: 1800, isExpense: true, categoryId: utilities.id },
      { budgetId: familyBudget.id, title: "Family Grocery", value: 450, isExpense: true, categoryId: food.id },
      { budgetId: familyBudget.id, title: "Car Fuel", value: 120, isExpense: true, categoryId: transport.id },
      { budgetId: familyBudget.id, title: "Cinema Tickets", value: 60, isExpense: true, categoryId: entertainment.id },
      { budgetId: bobBudget.id, title: "Freelance Income", value: 2000, isExpense: false, categoryId: salary.id },
      { budgetId: bobBudget.id, title: "Gym Membership", value: 50, isExpense: true, categoryId: entertainment.id },
    ],
  });

  console.log("Seed complete!");
  console.log("Users: alice@example.com, bob@example.com, carol@example.com");
  console.log("Password for all: password123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
