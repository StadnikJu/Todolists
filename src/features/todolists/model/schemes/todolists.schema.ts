import { TaskPriority, TaskStatus } from "@/common/enum/enums";
import * as z from "zod";

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.iso.datetime({ local: true }).nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.iso.datetime({ local: true }),
});

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.number(),
});
