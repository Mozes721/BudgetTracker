import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

export const createBudgetSchema = z.object({
  title: z.string().min(1).max(100),
});

export const createEntrySchema = z.object({
  title: z.string().min(1).max(200),
  value: z.number().positive(),
  isExpense: z.boolean(),
  categoryId: z.number().int().positive(),
  date: z.string().optional(),
});

export const shareBudgetSchema = z.object({
  email: z.string().email(),
});
