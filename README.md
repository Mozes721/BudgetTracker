# FamilyBudget

A multi-user budget tracking app built with Next.js 14, TypeScript, PostgreSQL (Neon), Prisma, and NextAuth.js.

---

## Database Schema

Five tables live in the `public` schema on Neon:

```
User
 └── Budget (ownerId → User)
      └── BudgetEntry (budgetId → Budget, categoryId → Category)
      └── BudgetShare (budgetId → Budget, userId → User)

Category  ← shared lookup table, referenced by BudgetEntry
```

---

## How BudgetEntry and Category work together

### Category — the lookup table

`Category` is a short list of labels stored in the DB. It holds no money or dates — just names:

| id | name               |
|----|--------------------|
| 1  | Food & Groceries   |
| 2  | Transport          |
| 3  | Salary             |
| 4  | Entertainment      |
| 5  | Utilities          |

### BudgetEntry — the actual financial data

Every income or expense row lives here. Each entry holds a `categoryId` foreign key pointing to one of those labels:

| id | budgetId | categoryId | title          | value  | isExpense | date       |
|----|----------|------------|----------------|--------|-----------|------------|
| 1  | 1        | 3          | Monthly Salary | 4500   | false     | 2026-05-01 |
| 2  | 1        | 1          | Grocery Run    | 120.50 | true      | 2026-05-01 |
| 3  | 1        | 4          | Netflix        | 15.00  | true      | 2026-05-01 |

### Why not just store the category name directly on BudgetEntry?

If you wrote `category = "Food & Groceries"` as a plain string on every entry, you would:

- Repeat the same string thousands of times (wasted space)
- Break all historical entries if you rename a category
- Lose the ability to efficiently group or filter by category with an index

With a separate `Category` table you can do things like:

```sql
-- Total spent per category for a budget
SELECT c.name, SUM(e.value)
FROM "BudgetEntry" e
JOIN "Category" c ON c.id = e."categoryId"
WHERE e."budgetId" = 1 AND e."isExpense" = true
GROUP BY c.name;
```

The `categoryId` index on `BudgetEntry` makes this fast even with thousands of entries.

---

## Seed data

Run `npx prisma db seed` to populate the database with demo data:

| User              | Password    |
|-------------------|-------------|
| alice@example.com | password123 |
| bob@example.com   | password123 |
| carol@example.com | password123 |

Includes 3 budgets, 5 categories, multiple entries, and a shared budget between Alice and Bob.

---

## Stack

| Layer          | Technology                        |
|----------------|-----------------------------------|
| Framework      | Next.js 14 (App Router)           |
| Language       | TypeScript                        |
| Database       | PostgreSQL (Neon)                 |
| ORM            | Prisma 5                          |
| Auth           | NextAuth.js                       |
| UI             | Tailwind CSS                      |
| State          | Zustand                           |
| Containerization | Docker + docker-compose         |

---

## Environment variables

Create `.env` (gitignored) at the project root:

```env
DATABASE_URL=postgresql://...pooler connection string...
DIRECT_URL=postgresql://...direct connection string...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

## Commands

```bash
npm run dev              # Start dev server on :3000
npx prisma db seed       # Seed demo data
npx prisma studio        # Visual DB browser
npx prisma migrate dev   # Run migrations
```
